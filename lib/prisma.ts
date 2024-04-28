import { Disposal, Prisma, PrismaClient } from '@prisma/client';

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
      score: {
        // the dependencies
        needs: {
          id: true,
          startDate: true,
          endDate: true
        },
        async compute(batch) {
          // the computation logic
          const totalLength =
            (batch.endDate.getTime() - batch.startDate.getTime()) / (24 * 60000);
          const currentLength =
            (new Date().getTime() - batch.startDate.getTime()) / (24 * 60000);
          // console.log({batch});

          const amount = await prisma.disposal.findMany({where: {  batchId: batch.id }})
          // console.log({amount});
          
          return Math.round(((currentLength * 100) / totalLength) - amount.length * 1);
        },
      },
    },
  },
});

export default prisma;
