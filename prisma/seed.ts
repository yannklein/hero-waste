import {
  Batch,
  BatchCategory,
  DisposalCategory,
  Prisma,
  PrismaClient,
  TrashCategory,
} from '@prisma/client';
import { add } from 'date-fns';

const prisma = new PrismaClient();

const sample = (object) => {
  if (Array.isArray(object)) {
    return object[Math.floor(Math.random() * object.length)];
  } else {
    const values = Object.values(object);
    return values[Math.floor(Math.random() * values.length)];
  }
};

const randInt = (start, end = null) => {
  if (end === null) {
    end = start;
    start = 0;
  }
  return Math.random() * (end - start) + start;
};

async function main() {
  // Cleanup existing users
  await prisma.disposal.deleteMany({});
  await prisma.trashCan.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.batch.deleteMany({});

  const createYann = async (batch) => {
    console.log("Create yann's user");
    await prisma.user.create({
      data: {
        name: 'Yann Klein',
        email: 'yann.klein@me.com',
        batchId: batch.id,
      },
    });
  };

  const createTrashCan = async (batch, category) => {
    console.log(`Create ${batch.category} - ${category} trash cans`);
    const trashCan = await prisma.trashCan.create({
      data: {
        capacity: 40,
        category: category,
        batchCategory: batch.category,
      },
    });

    for (let i = 0; i < randInt(2, 10); i += 1) {
      createDisposal(batch, trashCan);
    }
  };

  const createDisposal = async (batch, trashCan) => {
    const category = sample(DisposalCategory);
    const createdAt = add(new Date(), { weeks: -randInt(6) });
    console.log(`Create ${batch.category} - ${category} disposal`);
    await prisma.disposal.create({
      data: {
        category: category,
        batchCategory: batch.category,
        batchId: batch.id,
        trashCanId: trashCan.id,
        createdAt: createdAt,
      },
    });
  };

  console.log('Create WEB and DATA batches');
  const webBatch = await prisma.batch.create({
    data: {
      lineId: "",
      name: '#1616',
      size: 43,
      startDate: add(new Date(), { days: -30 }),
      endDate: add(new Date(), { days: 33 }),
      category: BatchCategory['WEB'],
    },
  });

  await createYann(webBatch);

  const dataBatch = await prisma.batch.create({
    data: {
      lineId: "",
      name: '#1638',
      size: 31,
      startDate: add(new Date(), { days: -30 }),
      endDate: add(new Date(), { days: 33 }),
      category: BatchCategory['DATA'],
    },
  });

  for (let trashCat of Object.values(TrashCategory)) {
    createTrashCan(sample([webBatch, dataBatch]), trashCat);
  }
  console.log(`Database has been seeded. 🌱`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
