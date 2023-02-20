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

exports.buscarPorEmail = async (email) => {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: {
        email: email
      }
    });
    return usuario;
  } catch (erro) {
    console.log(erro);
    return erro;
  } finally {
    await prisma.$disconnect();
  }
}

exports.buscarPorId = async (codigo_usuario) => {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: {
        codigo_usuario: parseInt(codigo_usuario)
      }
    });
    return usuario;
  } catch (erro) {
    console.log(erro);
    return erro;
  } finally {
    await prisma.$disconnect();
  }
}

exports.listar = async () => {
  try {
    const usuarios = await prisma.usuario.findMany();
    return usuarios;
  } catch (erro) {
    console.log(erro);
    return erro;
  } finally {
    await prisma.$disconnect();
  }
}

exports.atualizar = async (codigo_usuario ,objUsuario) => {
  try {
    const usuario = await prisma.usuario.update({
      where: {
        codigo_usuario: parseInt(codigo_usuario)
      },
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

exports.remover = async (codigo_usuario) => {
  try {
    const usuario = await prisma.usuario.delete({
      where: {
        codigo_usuario: parseInt(codigo_usuario)
      }
    });
    return usuario;
  } catch (erro) {
    console.log(erro);
    return erro;
  } finally {
    await prisma.$disconnect();
  }
}
