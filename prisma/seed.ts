import { PrismaClient, Prisma } from '@prisma/client'
import { Users } from './users'
const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)
  for (const u of Users) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
