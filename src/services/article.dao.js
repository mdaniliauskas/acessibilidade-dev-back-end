const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.save = async (objArticle) => {
  const { title, description, authorId, categoryId, tags } = objArticle;
  try {
    // Create a new article
    return await prisma.article.create({
      data: {
        title,
        description,
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
    return await prisma.article.findUnique({
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

exports.list = async () => {
  try {
    return await prisma.article.findMany();
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    await prisma.$disconnect();
  }
}

exports.update = async (id, objArticle) => {
  const { title, description, authorId, categoryId, tags } = objArticle;
  try {
    if (!tags) {
      // Update article without tags
      return await prisma.article.update({
        where: {
          id: parseInt(id)
        },
        data: {
          title,
          description,
          authorId,
          categoryId,
        }
      });
    }
    // Remove all tags from article
    await removeAllTagsFromArticle(id);
    // Update article with tags
    return await prisma.article.update({
      where: {
        id: parseInt(id)
      },
      data: {
        title,
        description,
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
    // Remove articleTag
    await removeAllTagsFromArticle(id);
    // Remove article
    return await prisma.article.delete({
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

const removeAllTagsFromArticle = async (id) => {
  await prisma.articleTag.deleteMany({
    where: {
      articleId: parseInt(id)
    }
  });
}