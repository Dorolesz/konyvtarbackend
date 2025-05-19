import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient()
async function main() {
    for (let i = 0; i < 15; i++) {
        await prisma.rentals.create({
            data: {
                start_date: faker.date.recent(),
                end_date: faker.date.soon(),
                book: {
                    connect: {
                        id: faker.number.int({ min: 1, max: 15 })
                    }
                }
            }
        })
    }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })