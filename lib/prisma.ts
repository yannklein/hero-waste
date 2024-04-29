import { Disposal, Prisma, PrismaClient } from '@prisma/client';
import { add } from 'date-fns';

let prisma;

if (process.env.NODE_ENV !== 'production' && global.prisma) {
  prisma = global.prisma;
}

// type BatchExtended = {
//   id: string;
//   startDate: Date;
//   endDate: Date;
//   disposals: Disposal[];
// };

prisma = new PrismaClient().$extends({
  result: {
    batch: {
      lastWeekDisposals: {
        async compute(batch) {
          const amount = await prisma.disposal.count({
            where: {
              batchId: batch.id,
              createdAt: {
                gte: add(new Date(), { weeks: -1 }),
                lte: new Date(),
              },
            },
          });
          return amount;
        },
      },
      score: {
        needs: {
          id: true,
          startDate: true,
          endDate: true,
        },
        async compute(batch) {
          const totalLength =
            (batch.endDate.getTime() - batch.startDate.getTime()) /
            (24 * 60000);
          const currentLength =
            (new Date().getTime() - batch.startDate.getTime()) / (24 * 60000);

          const amount = await prisma.disposal.count({
            where: { batchId: batch.id },
          });

          return Math.round((currentLength * 100) / totalLength - amount * 1);
        },
      },
    },
  },
});

export default prisma;
