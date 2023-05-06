const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.save = async (objNews) => {
  const { title, description, source, link, authorId, categoryId, tags } = objNews;
  try {
    // Create a new news
    return await prisma.news.create({
      data: {
        title,
        description,
        source,
        link,
        authorId,
        categoryId,
        tags: {
          create: tags.map(tag => ({
            tag: {
              connectOrCreate: {
                where: {
                  title: tag.toLowerCase()
                },
                create: {
                  title: tag.toLowerCase()
                }
              }
            }
          }))
        }
      }
    });
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    await prisma.$disconnect();
  }
}

exports.searchById = async (id) => {
  try {
    return await prisma.news.findUnique({
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
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    await prisma.$disconnect();
  }
}

exports.fullSearch = async (search) => {
  try {
    return await prisma.news.findMany({
      where: {
        OR: [
          {
            title: {
              contains: search,
              mode: 'insensitive'
            }
          },
          {
            description: {
              contains: search,
              mode: 'insensitive'
            }
          },
          {
            source: {
              contains: search,
              mode: 'insensitive'
            }
          },
          {
            author: {
              OR: [
                {
                  first_name: {
                    contains: search,
                    mode: 'insensitive'
                  }
                },
                {
                  last_name: {
                    contains: search,
                    mode: 'insensitive'
                  }
                }
              ]
            }
          },
          {
            tags: {
              some: {
                tag: {
                  title: {
                    contains: search,
                    mode: 'insensitive'
                  }
                }
              }
            }
          }
        ]
      }
    });
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    await prisma.$disconnect();
  }
}


exports.list = async () => {
  try {
    return await prisma.news.findMany();
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
    if (!tags) {
      // Update news without tags
      return await prisma.news.update({
        where: {
          id: parseInt(id)
        },
        data: {
          title,
          description,
          source,
          link,
          authorId,
          categoryId
        }
      });
    }
    // Remove all tags from news
    await removeAllTagsFromNews(id);
    // Update news with tags
    return await prisma.news.update({
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
        tags: {
          create: tags.map(tag => ({
            tag: {
              connectOrCreate: {
                where: {
                  title: tag.toLowerCase()
                },
                create: {
                  title: tag.toLowerCase()
                }
              }
            }
          }))
        }
      }
    });
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
    await removeAllTagsFromNews(id);
    // Remove news
    return await prisma.news.delete({
      where: {
        id: parseInt(id)
      }
    });
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    await prisma.$disconnect();
  }
}

const removeAllTagsFromNews = async (id) => {
  await prisma.newsTag.deleteMany({
    where: {
      newsId: parseInt(id)
    }
  });
}