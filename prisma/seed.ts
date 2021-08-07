import { PrismaClient, Prisma } from '@prisma/client'
import { Users } from './users'
import { PaymentApplications } from './paymentApplications'
import { VersionNumbers } from './versionNumbers'
const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)
  for (const u of Users) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  for (const p of PaymentApplications) {
    const paymentApplicatonRes = await prisma.paymentApplication.create({
      data: p,
    })
    console.log(`Created paymentApplicatonRes with id: ${paymentApplicatonRes.id}`)
  }
  for (const v of VersionNumbers){
    const vendorsRes = await prisma.versionNumber.create({
      data: v,
    })
    console.log(`Created vendorsRes with id: ${vendorsRes.id}`)
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
