const { PrismaClient, sql } = require('@prisma/client');

const prisma = new PrismaClient();

exports.save = async (objTopic) => {
  const { title, description, authorId, categoryId, tags } = objTopic;
  try {
    // Create a new topic
    const topic = await prisma.topic.create({
      data: {
        title,
        description,
        authorId,
        categoryId,
      }
    });
    if (!tags) {
      return topic;
    }

    // Create tags and search for existing tags
    const tagsBD = await createAndSearchTags(tags);

    // ADD tags to topic
    await addTagsToTopic(tagsBD, topic);

    return topic;
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

exports.list = async () => {
  try {
    return await prisma.topic.findMany({
      include: {
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
      },
    });
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    await prisma.$disconnect();
  }
}

exports.update = async (id, objTopic) => {
  const { title, description, status, authorId, categoryId, tags } = objTopic;
  try {
    // Update topic
    const topic = await prisma.topic.update({
      where: {
        id: parseInt(id)
      },
      data: {
        title,
        description,
        status,
        authorId,
        categoryId,
      }
    });
    if (!tags) {
      return topic;
    }

    // Create tags and search for existing tags
    const tagsBD = await createAndSearchTags(tags);

    // Remove all tags from topic
    await removeAllTagsFromTopic(id)

    // ADD tags to topic
    await addTagsToTopic(tagsBD, topic);

    return topic;
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
    const topic = await prisma.topic.delete({
      where: {
        id: parseInt(id)
      }
    });

    return topic;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    await prisma.$disconnect();
  }
}

const createAndSearchTags =  async (tags) => {
  await prisma.tag.createMany({
    data: tags.map(tag => ({
      title: tag.toLowerCase()
    })),
    skipDuplicates: true
  });
  return await prisma.tag.findMany({
    where: {
      title: {
        in: tags.map(tag => tag.toLowerCase())
      }
    }
  });
}

const addTagsToTopic =  async (tagsBD, topic) => {
  await prisma.topicTag.createMany({
      data: tagsBD.map(tag => ({
        tagId: tag.id,
        topicId: topic.id
      })),
      skipDuplicates: true
    });
}

const removeAllTagsFromTopic = async (id) => {
  await prisma.topicTag.deleteMany({
    where: {
      topicId: parseInt(id)
    }
  });
}