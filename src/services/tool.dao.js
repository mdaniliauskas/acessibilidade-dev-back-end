const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.save = async (objTool) => {
  const { title, description, organization, link, authorId, categoryId, tags } = objTool;
  try {
    // Create a new tool
    return await prisma.tool.create({
      data: {
        title,
        description,
        organization,
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
    return await prisma.tool.findUnique({
      where: {
        id: parseInt(id)
      },
      select: {
        id: true,
        title: true,
        description: true,
        date_published: true,
        organization: true,
        link: true,
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
    return await prisma.tool.findMany({
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
            organization: {
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
      },
      select: {
        id: true,
        title: true,
      }
    });
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    await prisma.$disconnect();
  }
}

exports.listByCategory = async (categoryId) => {
  try {
    return await prisma.tool.findMany({
      where: {
        categoryId: parseInt(categoryId)
      },
      select: {
        id: true,
        title: true,
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
    return await prisma.tool.findMany({
      select: {
        id: true,
        title: true,
      }
    });
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    await prisma.$disconnect();
  }
}

exports.update = async (id, objTool) => {
  const { title, description, source, link, authorId, categoryId, tags } = objTool;
  try {
    if (!tags) {
      // Update tool without tags
      return await prisma.tool.update({
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
    }
    // Remove all tags from tool
    await removeAllTagsFromTool(id);
    // Update tool with tags
    return await prisma.tool.update({
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
    // Remove toolTag
    await removeAllTagsFromTool(id);
    // Remove tool
    return await prisma.tool.delete({
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

const removeAllTagsFromTool = async (id) => {
  await prisma.toolTag.deleteMany({
    where: {
      toolId: parseInt(id)
    }
  });
}