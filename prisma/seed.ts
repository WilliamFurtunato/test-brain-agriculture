import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
const prisma = new PrismaClient()
async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@prisma.io' },
    update: {},
    create: {
      email: 'admin@prisma.io',
      role: 'ADMIN',
      password_hash: await hash('123456', 6),
    },
  })

  const firstProducer = await prisma.ruralProducer.upsert({
    where: { document: '43.848.884/0001-41' },
    update: {},
    create: {
      document: '43.848.884/0001-41',
      name: 'John Doe First',
      farm_name: 'John Farm First',
      city: 'Sao Paulo',
      state: 'SP',
      total_hectares_farm: 10,
      arable_hectares: 6,
      vegetation_hectared: 5,
      plantedCrops: {
        create: [
          { name: 'COFFEE' },
          { name: 'CORN' },
          { name: 'COTTON' },
          { name: 'SOYBEANS' },
        ],
      },
    },
  })

  const secondProducer = await prisma.ruralProducer.upsert({
    where: { document: '923.038.600-67' },
    update: {},
    create: {
      document: '923.038.600-67',
      name: 'John Doe Second',
      farm_name: 'John Farm Second',
      city: 'Rio de Janeiro',
      state: 'RJ',
      total_hectares_farm: 15,
      arable_hectares: 10,
      vegetation_hectared: 5,
      plantedCrops: {
        create: [{ name: 'SUGARCANE' }, { name: 'CORN' }],
      },
    },
  })

  console.log({ admin, firstProducer, secondProducer })
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
