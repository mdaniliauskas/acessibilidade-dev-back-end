const { PrismaClient } = require('@prisma/client');

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

    // ADD tags to topic
    await prisma.topicTag.createMany({
      data: tagsBD.map(tag => ({
        tagId: tag.id,
        topicId: topic.id
      })),
      skipDuplicates: true
    });

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
    const topic = await prisma.topic.findUnique({
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
    return topic;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    await prisma.$disconnect();
  }
}

exports.list = async () => {
  try {
    const topic = await prisma.topic.findMany();
    return topic;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    await prisma.$disconnect();
  }
}

exports.update = async (id, objTopic) => {
  const { title, description, authorId, categoryId, tags } = objTopic;
  try {
    // Update topic
    const topic = await prisma.topic.update({
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
    if (!tags) {
      return topic;
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

    // Remove all tags from topic
    await prisma.topicTag.deleteMany({
      where: {
        topicId: tagsBD.id
      }
    });

    // ADD tags to topic
    await prisma.topicTag.createMany({
      data: tagsBD.map(tag => ({
        tagId: tag.id,
        topicId: topic.id
      })),
      skipDuplicates: true
    });
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
