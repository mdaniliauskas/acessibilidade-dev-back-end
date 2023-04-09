const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.preSave = async (objUser) => {
  try {
    return await prisma.user.create({
      data: objUser,
    });
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    await prisma.$disconnect();
  }
};

exports.searchById = async (id) => {
  try {
    return await prisma.user.findUnique({
      where: {
        id: id
      },
    });
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    await prisma.$disconnect();
  }
};

exports.list = async () => {
  try {
    return await prisma.user.findMany();
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    await prisma.$disconnect();
  }
};

exports.update = async (objUser) => {
  try {
    return await prisma.user.update({
      where: {
        id: objUser.id,
      },
      data: objUser,
    });
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    await prisma.$disconnect();
  }
};

exports.remove = async (id) => {
  try {
    return await prisma.user.delete({
      where: {
        id: id
      },
    });
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    await prisma.$disconnect();
  }
};
