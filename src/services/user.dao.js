const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.gravar = async (objUsuario) => {
  try {
    const usuario = await prisma.usuario.create({
      data: objUsuario
    });
    return usuario;
  } catch (erro) {
    console.log(erro);
    return erro;
  } finally {
    await prisma.$disconnect();
  }
}
