import { Disposal, Prisma, PrismaClient } from '@prisma/client';
import { add } from 'date-fns';

let prisma;

if (process.env.NODE_ENV !== 'production' && global.prisma) {
  prisma = global.prisma;
}

type BatchExtended = {
  id?: String;
  startDate?: Date;
  endDate?: Date;
  disposals?: Disposal[];
};

prisma = new PrismaClient().$extends({
  result: {
    batch: {
      lastWeekDisposals: {
        include: {
          disposals: true,
        },
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
          endDate: true
        },
        include: {
          disposals: true
        },
        compute(batch: BatchExtended) {
          const totalLength =
            (batch.endDate.getTime() - batch.startDate.getTime()) /
            (24 * 60000);
          const currentLength =
            (new Date().getTime() - batch.startDate.getTime()) / (24 * 60000);

          return Math.round((currentLength * 100) / totalLength - batch.disposals.length * 1);
        },
      },
    },
  },
});

export default prisma;
