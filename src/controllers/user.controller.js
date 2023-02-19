const { PrismaClient } = require('@prisma/client');
const dayjs = require('dayjs');
var customParseFormat = require('dayjs/plugin/customParseFormat')

const prisma = new PrismaClient()

exports.signup = async (req, res) => {
    const {
        nome,
        sobrenome,
        data_nascimento,
        email,
        senha,
        area_conhecimento,
        possui_conhecimento
    } = req.body;
    dayjs.extend(customParseFormat)
    parseDate = dayjs(data_nascimento, "DD-MM-YYYY").toDate()

    try {
        const usuario = await prisma.usuario.create({
            data: {
                nome,
                sobrenome,
                data_nascimento: parseDate,
                email,
                senha,
                area_conhecimento,
                possui_conhecimento
            }
        })
        res.status(200).json({
            success: true,
            message: usuario
        })
    } catch (erro) {
        res.status(500).json({
            success: false,
            message: erro
        })
    }
    await prisma.$disconnect()
};


exports.signin = async (req, res) => {

    const { email, senha } = req.body;
    try {
        const usuario = await prisma.usuario.findUnique({
            where: {
                email: email
            }
        })
        if (usuario.senha === senha) {
            res.status(200).json({
                success: true,
                message: usuario
            })
        } else {
            res.status(500).json({
                success: false,
                message: "Senha incorreta"
            })
        }
    } catch (erro) {
        res.status(500).json({
            success: false,
            message: erro
        })
    }
    await prisma.$disconnect()
}



exports.getUser = async (req, res) => {
    var usuario
    try {
        usuario = await prisma.usuario.findUnique({
            where: {
                codigo_usuario: parseInt(req.params.codigo_usuario)
            }
        })

    } catch (erro) {

        res.status(500).json({
            success: false,
            message: erro
        })
    }
    res.status(200).json({
        success: true,
        message: usuario
    })
    await prisma.$disconnect()

}

exports.getAll = async (req, res) => {

    try {
        const usuario = await prisma.usuario.findMany()
        res.status(200).json({
            success: true,
            message: usuario
        })
    } catch (erro) {
        res.status(500).json({
            success: false,
            message: erro
        })
    }
    await prisma.$disconnect()
}

exports.update = async (req, res) => {

    const {
        nome,
        sobrenome,
        data_nascimento,
        email,
        senha,
        area_conhecimento,
        possui_conhecimento,
        tipo_acesso
    } = req.body;

    try {
        const usuario = await prisma.usuario.update({
            where: {
                codigo_usuario: parseInt(req.params.codigo_usuario)
            },
            data: {
                nome,
                sobrenome,
                data_nascimento,
                email,
                senha,
                area_conhecimento,
                possui_conhecimento,
                tipo_acesso
            }
        })
        res.status(200).json({
            success: true,
            message: usuario
        })
    } catch (erro) {
        res.status(500).json({
            success: false,
            message: erro
        })
    }
    await prisma.$disconnect()
}

exports.remove = async (req, res) => {

    try {
        const usuario = await prisma.usuario.delete({
            where: {
                codigo_usuario: parseInt(req.params.codigo_usuario)
            }
        })
        res.status(200).json({
            success: true,
            message: usuario
        })
    } catch (erro) {
        res.status(500).json({
            success: false,
            message: erro
        })
    }
    await prisma.$disconnect()

}