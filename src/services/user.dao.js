const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.save = async (objUser) => {
  try {
    const user = await prisma.user.create({
      data: objUser
    });
    return user;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    await prisma.$disconnect();
  }
}

exports.searchByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });
    return user;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    await prisma.$disconnect();
  }
}

exports.searchById = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id)
      }
    });
    return user;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    await prisma.$disconnect();
  }
}

exports.list = async () => {
  try {
    const user = await prisma.user.findMany();
    return user;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    await prisma.$disconnect();
  }
}

exports.update = async (id, objUser) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: parseInt(id)
      },
      data: objUser
    });
    return user;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    await prisma.$disconnect();
  }
}

exports.remove = async (id) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id: parseInt(id)
      }
    });
    return user;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    await prisma.$disconnect();
  }
}
