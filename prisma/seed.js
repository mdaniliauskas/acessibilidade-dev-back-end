const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {

  const category1 = await prisma.category.upsert({
    where: { title: 'deficiência auditiva' },
    update: {},
    create: {
      title: 'deficiência auditiva',
    }
  })

  const category2 = await prisma.category.upsert({
    where: { title: 'deficiência motora' },
    update: {},
    create: {
      title: 'deficiência motora',
    }
  })

  const category3 = await prisma.category.upsert({
    where: { title: 'deficiência visual' },
    update: {},
    create: {
      title: 'deficiência visual',
    }
  })

  const user1 = await prisma.user.upsert({
    where: { email: 'arthur.nascimento@example.com' },
    update: {},
    create: {
      id: "exempla-id-1",
      first_name: "Arthur",
      last_name: "Nascimento",
      email: 'arthur.nascimento@example.com',
      specialist_area: "Software Engineer",
      disability: "Visual",
      topics: {
        create: {
          title: 'Check out Prisma with Next.js',
          description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
          categoryId: category1.id,
        }
      },
      news: {
        create: {
          title: 'Check out Prisma with Next.js',
          description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
          source: "google",
          link: "https://www.google.com",
          categoryId: category2.id,
        }
      }
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'arthur.lima@example.com' },
    update: {},
    create: {
      id: "exempla-id-2",
      first_name: "Arthur",
      last_name: "Lima",
      email: 'arthur.lima@example.com',
      specialist_area: "Software Architect",
      disability: "Motora",
      topics: {
        create: {
          title: 'Check out Prisma with Next.js',
          description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
          categoryId: category2.id,
        }     
      },
      news: {
        create: {
          title: 'Check out Prisma with Next.js',
          description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
          source: "google",
          link: "https://www.google.com",
          categoryId: category3.id,
        }
      },
    },
  })
  console.log({ Categories: { category1, category2, category3 } })
  console.log({ Users: { user1, user2 } })
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