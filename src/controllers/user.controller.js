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
    users.forEach(user => {
        if (user.nome == req.body.nome && user.senha == req.body.senha) {
            res.status(200).end()
        }
    });
    res.status(500).end()
}


exports.getUser = async (req, res) => {
    let find = false
    users.forEach(user => {
        if (user.id === parseInt(req.params.id)) {
            find = true;
            res.send(user);
        }
    })
    if (!find)
        res.status(404).send({
            success: false,
            message: "user not found"
        })

}

exports.update = async (req, res) => {

}

exports.remove = async (req, res) => {

    let usersLength = users.length;

    users = users.filter((user) => user.id !== parseInt(req.params.id))

    let newUsersLength = users.length;

    if (newUsersLength < usersLength)
        res.send({
            success: true,
            message: 'user removed'
        })
    else
        res.status(404).send({
            success: false,
            message: 'user not found'
        })
}