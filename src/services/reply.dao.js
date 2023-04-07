const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.save = async (objReply) => {
  try {
    // Create a new reply
    return await prisma.reply.create({
      data: objReply
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
    return await prisma.reply.findUnique({
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

exports.list = async () => {
  try {
    return await prisma.reply.findMany();
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    await prisma.$disconnect();
  }
}

exports.update = async (id, objReply) => {
  try {
    // Update reply
    return await prisma.reply.update({
      where: {
        id: parseInt(id)
      },
      data: objReply
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
    // Remove reply
      return await prisma.reply.delete({
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