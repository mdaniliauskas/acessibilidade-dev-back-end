const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.save = async (objTopic) => {
  const { title, description, authorId, categoryId, tags } = objTopic;
  try {
    // Create a new topic
    return await prisma.topic.create({
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
    return await prisma.topic.findUnique({
      where: {
        id: parseInt(id)
      },
      select: {
        id: true,
        title: true,
        description: true,
        date_published: true,
        status: true,
        votes: true,
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
          select: {
            tag: {
              select: {
                title: true
              }
            }
          }
        },
        replies: {
          select: {
            description: true,
            date_published: true,
            author: {
              select: {
                first_name: true,
                last_name: true
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

exports.fullSearch = async (content) => {
  try {
    return await prisma.topic.findMany({
      orderBy: {
        date_published: 'desc'
      },
      where: {
        OR: [
          {
            title: {
              contains: content
            }
          },
          {
            description: {
              contains: content
            }
          },
          {
            author: {
              OR: [
                {
                  first_name: {
                    contains: content
                  }
                },
                {
                  last_name: {
                    contains: content
                  }
                }
              ]
            }
          },
          {
            category: {
              title: {
                contains: content
              }
            }
          },
          {
            tags: {
              some: {
                tag: {
                  title: {
                    contains: content
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
        description: true,
        date_published: true,
        status: true,
        votes: true,
        author: {
          select: {
            first_name: true,
            last_name: true,
            specialist_area: true
          }
        },
        replies: {
          select: {
            id: true
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

exports.listByCategory = async (categoryId) => {
  try {
    return await prisma.topic.findMany({
      orderBy: {
        date_published: 'desc'
      },
      where: {
        categoryId: parseInt(categoryId)
      },
      select: {
        id: true,
        title: true,
        description: true,
        date_published: true,
        status: true,
        votes: true,
        author: {
          select: {
            first_name: true,
            last_name: true,
            specialist_area: true
          }
        },
        replies: {
          select: {
            id: true
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

exports.listByAuthor = async (authorId) => {
  try {
    return await prisma.topic.findMany({
      orderBy: {
        date_published: 'desc'
      },
      where: {
        authorId
      },
      select: {
        id: true,
        title: true,
        description: true,
        date_published: true,
        status: true,
        votes: true,
        author: {
          select: {
            first_name: true,
            last_name: true,
            specialist_area: true
          }
        },
        replies: {
          select: {
            id: true
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
    return await prisma.topic.findMany({
      orderBy: {
        date_published: 'desc'
      },
      select: {
        id: true,
        title: true,
        description: true,
        date_published: true,
        status: true,
        votes: true,
        author: {
          select: {
            first_name: true,
            last_name: true,
            specialist_area: true
          }
        },
        replies: {
          select: {
            id: true
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

exports.update = async (id, objTopic) => {
  const { title, description, status, votes, authorId, categoryId, tags } = objTopic;
  try {
    if (!tags) {
      // Update topic without tags
      return await prisma.topic.update({
        where: {
          id: parseInt(id)
        },
        data: {
          title,
          description,
          status,
          votes,
          authorId,
          categoryId,
        }
      });
    }
    // Remove all tags from topic
    await removeAllTagsFromTopic(id)
    // Update topic with tags
    return await prisma.topic.update({
      where: {
        id: parseInt(id)
      },
      data: {
        title,
        description,
        status,
        votes,
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
    // Remove all tags from topic
    await removeAllTagsFromTopic(id)

    // Remove topic
    return await prisma.topic.delete({
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

const removeAllTagsFromTopic = async (id) => {
  await prisma.topicTag.deleteMany({
    where: {
      topicId: parseInt(id)
    }
  });
}