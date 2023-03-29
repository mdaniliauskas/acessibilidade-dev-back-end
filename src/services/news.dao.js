const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.save = async (objNews) => {
  console.log(objNews);
  const { title, description, source, link, authorId, categoryId, tags } = objNews;
  try {
    // Create a new news
    const news = await prisma.news.create({
      data: {
        title,
        description,
        source,
        link,
        authorId,
        categoryId,
      }
    });
    if (!tags) {
      return news;
    }

    // Create tags and search for existing tags
    await prisma.tag.createMany({
      data: tags.map(tag => ({
        title: tag.toLowerCase()
      })),
      skipDuplicates: true
    });
    const tagsBD = await prisma.tag.findMany({
      where: {
        title: {
          in: tags.map(tag => tag.toLowerCase())
        }
      }
    });

    // ADD tags to news
    await prisma.newsTag.createMany({
      data: tagsBD.map(tag => ({
        tagId: tag.id,
        newsId: news.id
      })),
      skipDuplicates: true
    });

    return news;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    await prisma.$disconnect();
  }
}

exports.searchById = async (id) => {
  try {
    const news = await prisma.news.findUnique({
      where: {
        id: parseInt(id)
      },
      include: {
        author: {
          select: {
            first_name: true,
            last_name: true
          }
        },
        category: {
          select: {
            title: true
          }
        },
        tags: {
          include: {
            tag: {
              select: {
                title: true
              }
            }
          }
        }
      }
    });
    return news;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    await prisma.$disconnect();
  }
}

exports.list = async () => {
  try {
    const news = await prisma.news.findMany();
    return news;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    await prisma.$disconnect();
  }
}

exports.update = async (id, objNews) => {
  const { title, description, source, link, authorId, categoryId, tags } = objNews;
  try {
    // Update news
    const news = await prisma.news.update({
      where: {
        id: parseInt(id)
      },
      data: {
        title,
        description,
        source,
        link,
        authorId,
        categoryId,
      }
    });
    if (!tags) {
      return news;
    }

    // Create tags and search for existing tags
    await prisma.tag.createMany({
      data: tags.map(tag => ({
        title: tag.toLowerCase()
      })),
      skipDuplicates: true
    });
    const tagsBD = await prisma.tag.findMany({
      where: {
        title: {
          in: tags.map(tag => tag.toLowerCase())
        }
      }
    });

    // Remove all tags from news
    await prisma.newsTag.deleteMany({
      where: {
        newsId: parseInt(id)
      }
    });

    // ADD tags to news
    await prisma.newsTag.createMany({
      data: tagsBD.map(tag => ({
        tagId: tag.id,
        newsId: news.id
      })),
      skipDuplicates: true
    });
    return news;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    await prisma.$disconnect();
  }
}

exports.remove = async (id) => {
  try {
    // Remove all tags from news
    await prisma.newsTag.deleteMany({
      where: {
        newsId: parseInt(id)
      }
    });

    // Remove news
    const news = await prisma.news.delete({
      where: {
        id: parseInt(id)
      }
    });

    return news;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    await prisma.$disconnect();
  }
}
