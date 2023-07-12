const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

import dotenv from 'dotenv'
dotenv.config();

async function main() {
    const category = await prisma.category.upsert({
      create: {
        workoutLogs: {
          create: [
            {
              name: "Vegetarian"
            },
            {
                name: "Non-vegetarian"
            }
          ],
        },
      },
    });
  }
  
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });