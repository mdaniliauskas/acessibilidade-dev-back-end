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

  const tag1 = await prisma.tag.upsert({
    where: { title: 'tag1' },
    update: {},
    create: {
      title: 'tag1',
    }
  })

  const tag2 = await prisma.tag.upsert({
    where: { title: 'tag2' },
    update: {},
    create: {
      title: 'tag2',
    }
  })

  const tag3 = await prisma.tag.upsert({
    where: { title: 'tag3' },
    update: {},
    create: {
      title: 'tag3',
    }
  })

  const tag4 = await prisma.tag.upsert({
    where: { title: 'tag4' },
    update: {},
    create: {
      title: 'tag4',
    }
  })

  const tag5 = await prisma.tag.upsert({
    where: { title: 'tag5' },
    update: {},
    create: {
      title: 'tag5',
    }
  })

  const tag6 = await prisma.tag.upsert({
    where: { title: 'tag6' },
    update: {},
    create: {
      title: 'tag6',
    }
  })

  const user1 = await prisma.user.upsert({
    where: { email: 'arthur.nascimento@example.com' },
    update: {},
    create: {
      id: "exempla-id-1",
      first_name: "Arthur",
      last_name: "Nascimento",
      birth_date: new Date(2001, 11, 13),
      email: 'arthur.nascimento@example.com',
      specialist_area: "Software Engineer",
      disability: "Visual",
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'arthur.lima@example.com' },
    update: {},
    create: {
      id: "exempla-id-2",
      first_name: "Arthur",
      last_name: "Lima",
      birth_date: new Date(2001, 11, 13),
      email: 'arthur.lima@example.com',
      specialist_area: "Software Architect",
      disability: "Motora",
    },
  })

  const topic1 = await prisma.topic.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Check out Prisma with Next.js',
      description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
      categoryId: category1.id,
      authorId: user1.id,
      tags: {
        createMany: {
          data: [
            {
              tagId: tag1.id,
            },
            {
              tagId: tag2.id,
            },
            {
              tagId: tag3.id,
            },
          ]
        }
      }
    }
  })

  const topic2 = await prisma.topic.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'Check out Prisma with Next.js',
      description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
      categoryId: category2.id,
      authorId: user2.id,
      tags: {
        createMany: {
          data: [
            {
              tagId: tag4.id,
            },
            {
              tagId: tag5.id,
            },
            {
              tagId: tag6.id,
            },
          ]
        }
      }
    }
  })

  const news1 = await prisma.news.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Check out Prisma with Next.js',
      description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
      source: "google",
      link: "https://www.google.com",
      categoryId: category3.id,
      authorId: user1.id,
      tags: {
        createMany: {
          data: [
            {
              tagId: tag1.id,
            },
            {
              tagId: tag2.id,
            },
            {
              tagId: tag3.id,
            },
          ]
        }
      }
    }
  })

  const news2 = await prisma.news.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'Check out Prisma with Next.js',
      description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
      source: "google",
      link: "https://www.google.com",
      categoryId: category1.id,
      authorId: user2.id,
      tags: {
        createMany: {
          data: [
            {
              tagId: tag4.id,
            },
            {
              tagId: tag5.id,
            },
            {
              tagId: tag6.id,
            },
          ]
        }
      }
    }
  })

  const reply1 = await prisma.reply.upsert({
    where: { id: 1 },
    update: {},
    create: {
      description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
      authorId: user2.id,
      topicId: topic1.id,
    }
  })

  const reply2 = await prisma.reply.upsert({
    where: { id: 2 },
    update: {},
    create: {
      description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
      authorId: user1.id,
      topicId: topic2.id,
    }
  })

  const tool1 = await prisma.tool.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Check out Prisma with Next.js',
      description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
      organization: "google",
      link: "https://www.google.com",
      categoryId: category3.id,
      authorId: user1.id,
      tags: {
        createMany: {
          data: [
            {
              tagId: tag1.id,
            },
            {
              tagId: tag2.id,
            },
            {
              tagId: tag3.id,
            },
          ]
        }
      }
    }
  })

  const tool2 = await prisma.tool.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'Check out Prisma with Next.js',
      description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
      organization: "google",
      link: "https://www.google.com",
      categoryId: category1.id,
      authorId: user2.id,
      tags: {
        createMany: {
          data: [
            {
              tagId: tag4.id,
            },
            {
              tagId: tag5.id,
            },
            {
              tagId: tag6.id,
            },
          ]
        }
      }
    }
  })

  console.log({ Categories: { category1, category2, category3 } })
  console.log({ Tags: { tag1, tag2, tag3, tag4, tag5, tag6 } })
  console.log({ Users: { user1, user2 } })
  console.log({ Topics: { topic1, topic2 } })
  console.log({ News: { news1, news2 } })
  console.log({ Replies: { reply1, reply2 } })
  console.log({ Tools: { tool1, tool2 } })
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