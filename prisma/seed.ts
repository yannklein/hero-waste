import { Batch, BatchCategory, DisposalCategory, Prisma, PrismaClient, TrashCategory } from "@prisma/client";

const prisma = new PrismaClient();

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
        name: "Yann Klein", 
        email: "yann.klein@me.com",
        batchId: batch.id
      }
    });
  }

  const createTrashCan = async (batch, category) => {
    console.log(`Create ${batch.category} - ${category} trash cans`);
    const trashCan = await prisma.trashCan.create({ 
      data: {
        capacity: 40, 
        category: category,
        batchCategory: batch.category,
      }
    });
    createDisposal(batch, trashCan, DisposalCategory['REGULAR'])
    createDisposal(batch, trashCan, DisposalCategory['REGULAR'])
    createDisposal(batch, trashCan, DisposalCategory['PENALTY'])
  }

  const createDisposal = async (batch, trashCan, category) => {
    console.log(`Create ${batch.category} - ${category} disposal`);
    await prisma.disposal.create({ 
      data: {
        category: category,
        batchCategory: batch.category,
        batchId: batch.id,
        trashCanId: trashCan.id,
      }
    });
  }

  console.log("Create WEB and DATA batches");
  for (let cat of Object.values(BatchCategory)) {
    const batch = await prisma.batch.create({
      data: {
        name: "#1638 - #1616",
        size: 43,
        startDate: new Date(Date.parse('2024-03-22T15:00:00.000Z')),
        endDate: new Date(Date.parse('2024-05-30T15:00:00.000Z')),
        category: cat
      }
    });
    if (cat === BatchCategory['WEB']) {
      await createYann(batch);
    }
    for (let trashCat of Object.values(TrashCategory)) {
      createTrashCan(batch, trashCat);
    };
  };


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