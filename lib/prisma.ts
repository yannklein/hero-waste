import {
  Batch,
  Disposal,
  DisposalCategory,
  Prisma,
  PrismaClient,
  TrashCategory,
} from '@prisma/client';
import { add } from 'date-fns';
import TrashCan from '../components/TrashCan';

let prisma;

if (process.env.NODE_ENV !== 'production' && global.prisma) {
  prisma = global.prisma;
}

type BatchExtended = {
  id?: String;
  startDate?: Date;
  endDate?: Date;
  disposals?: Disposal[];
  score?: Number;
  size?: Number;
};

prisma = new PrismaClient()
  .$extends({
    result: {
      batch: {
        lastWeekDisposals: {
          // include: {
          //   disposals: {
          //     where: {
          //       createdAt: {
          //         gte: add(new Date(), { weeks: -1 }),
          //         lte: new Date(),
          //       },
          //     }
          //   }
          // },
          // compute(batch: BatchExtended) {
          //   return batch.disposals.length
          // },
          include: {
            disposals: true,
          },
          compute(batch: BatchExtended) {
            return batch.disposals.filter(
              (disp) =>
                disp.createdAt >= add(new Date(), { weeks: -1 }) &&
                disp.createdAt < new Date(),
            ).length;
          },
        },
        score: {
          needs: {
            id: true,
            startDate: true,
            endDate: true,
          },
          include: {
            disposals: true,
          },
          compute(batch: BatchExtended) {
            const totalLength =
              (batch.endDate.getTime() - batch.startDate.getTime()) /
              (24 * 60000);
            const currentLength =
              (new Date().getTime() - batch.startDate.getTime()) / (24 * 60000);

            const regularCount = batch.disposals.filter(
              (d) => d.category === DisposalCategory['REGULAR'],
            ).length;
            const penaltyCount = batch.disposals.length - regularCount;

            const progress = (currentLength * 100) / totalLength;
            const totalPenalty = regularCount * 0.3 + penaltyCount;
            // console.log("score data", progress, totalPenalty, batch.size);

            return Math.round(
              progress - totalPenalty * (100 / Number(batch.size)),
            );
          },
        },
      },
    },
  })
  .$extends({
    model: {
      batch: {
        async sortingRate(batch: Batch, weekAgo = 1) {
          const amountDisposals = await prisma.disposal.count({
            where: {
              batchId: batch.id,
              createdAt: {
                gte: add(new Date(), { weeks: -weekAgo }),
                lte: add(new Date(), { weeks: 1 - weekAgo }),
              },
            },
          });
          const burnableCount = await prisma.disposal.count({
            where: {
              trashCan: { is: { category: TrashCategory['BURNABLE'] } },
              batchId: batch.id,
              createdAt: {
                gte: add(new Date(), { weeks: -weekAgo }),
                lte: add(new Date(), { weeks: 1 - weekAgo }),
              },
            },
          });
          if (amountDisposals === 0) {
            return 1;
          }
          return 1 - burnableCount / amountDisposals;
        },
        async prevWeekPenalties(batch: Batch, weekAgo = 1) {
          return await prisma.disposal.count({
            where: {
              category: DisposalCategory['PENALTY'],
              batchId: batch.id,
              createdAt: {
                gte: add(new Date(), { weeks: -weekAgo }),
                lte: add(new Date(), { weeks: 1 - weekAgo }),
              },
            },
          });
        },
        async prevWeekDisposal(batch: Batch, weekAgo: number = 1) {          
          return await prisma.disposal.count({
            where: {
              batchId: batch.id,
              createdAt: {
                gte: add(new Date(), { weeks: -weekAgo }),
                lte: add(new Date(), { weeks: 1 - weekAgo }),
              },
            },
          });
        },
        async winningBatch() {
          const result = await prisma.$queryRawUnsafe(`
        with batch_info as (
          SELECT 
            EXTRACT(DAY from (b.end_date - b.start_date)) AS total_days,
            EXTRACT(DAY from (b.end_date - NOW())) AS day_count,
            *
          from batches b
          ), scores as (
          SELECT 
            ROUND(AVG(bi.day_count) * 100 / AVG(bi.total_days)) - COUNT(d.id) as score,
            bi.id
          FROM batch_info as bi
          JOIN disposals d ON bi.id = d.batch_id
          group by bi.id
          )
          SELECT
            b.*,
            b.start_date as "startDate",
            b.end_date as "endDate",
            b.created_at as "createdAt",
            b.updated_at as "updatedAt"

          from batches b
          join scores s on s.id = b.id
          order by s.score
          limit 1
        `);

          return result[0];
        },
      },
    },
  });

export default prisma;
