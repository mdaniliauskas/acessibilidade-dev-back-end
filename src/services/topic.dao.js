const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.save = async (objTopic) => {
  try {
    const topic = await prisma.topic.create({
      data: objTopic
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
  try {
    const topic = await prisma.topic.update({
      where: {
        id: parseInt(id)
      },
      data: objTopic
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
