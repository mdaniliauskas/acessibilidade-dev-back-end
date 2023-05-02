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
    return await prisma.tool.findMany();
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
    // Update tool
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
    await prisma.toolTag.deleteMany({
      where: {
        toolId: parseInt(id)
      }
    });
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