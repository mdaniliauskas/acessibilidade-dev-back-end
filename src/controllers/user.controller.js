const { User } = require("../models/user");
const { buscarPorId, listar } = require("../services/user.dao");

exports.signup = async (req, res) => {
  const objUsuario = new User(req.body);
  const retornoCadastrar = await objUsuario.cadastrar();

  if (retornoCadastrar.codigo_usuario) {
    res.status(200).json({
      success: true,
      message: retornoCadastrar,
    });
  } else {
    res.status(500).json({
      success: false,
      message: retornoCadastrar,
    });
  }
};

exports.signin = async (req, res) => {
  const objUsuario = new User(req.body);
  const retornoLogar = await objUsuario.logar();

  if (retornoLogar.codigo_usuario) {
    res.status(200).json({
      success: true,
      message: retornoLogar,
    });
  } else {
    res.status(403).json({
      success: false,
      message: retornoLogar,
    });
  }
};

exports.getUser = async (req, res) => {
  const retornoBanco = await buscarPorId(req.params.codigo_usuario);
  if (retornoBanco) {
    res.status(200).json({
      success: true,
      message: retornoBanco,
    });
  } else {
    res.status(404).json({
      success: false,
      message: retornoBanco,
    });
  }
};

exports.getAll = async (req, res) => {
  const retornoBanco = await listar();
  if (retornoBanco) {
    res.status(200).json({
      success: true,
      message: retornoBanco,
    });
  } else {
    res.status(404).json({
      success: false,
      message: retornoBanco,
    });
  }
};

exports.update = async (req, res) => {
  const objUsuario = new User(req.body);
  const retornoAtualizar = await objUsuario.atualizar(req.params);

  if (retornoAtualizar.codigo_usuario) {
    res.status(200).json({
      success: true,
      message: retornoAtualizar,
    });
  } else {
    res.status(404).json({
      success: false,
      message: retornoAtualizar,
    });
  }
};

exports.remove = async (req, res) => {
  const objUsuario = new User(req.body);
  const retornoRemover = await objUsuario.excluir(req.params);

  if (retornoRemover) {
    res.status(200).json({
      success: true,
      message: retornoRemover,
    });
  } else {
    res.status(404).json({
      success: false,
      message: retornoRemover,
    });
  }
};
