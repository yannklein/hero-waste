import prisma from '../../../lib/prisma';
import { BatchCategory, TrashCategory, DisposalCategory } from '@prisma/client';

export default async function handle(req, res) {

  const { category, trashCategory, batchCategory } = req.body;
  try {
    const trashCan = await prisma.trashCan.findFirst({
      select: {
        id: true
      },
      where: {
        batchCategory: BatchCategory[batchCategory],
        category: TrashCategory[trashCategory],
      },
      orderBy: {
        batchCategory: 'asc',
      }
    });
    const activeBatch = await prisma.batch.findFirst({
      select: {
        id: true
      },
      where: {
        category: BatchCategory[batchCategory],
        startDate: {
          lte: new Date(),
        },
        endDate: {
          gte: new Date(),
        },
      },
    });
    const data = {
      category: DisposalCategory[category],
      batchCategory: BatchCategory[batchCategory],
      batchId: activeBatch.id,
      trashCanId: trashCan.id,
    };
    const disposal = await prisma.disposal.create({ data });
    res.json(disposal);
  } catch (error) {
    console.error(error);
  }
}
