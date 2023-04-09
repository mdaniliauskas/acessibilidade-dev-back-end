const { User } = require("../models/user");
const { searchById, list } = require("../services/user.dao");

exports.preSignup = async (req, res) => {
  const objUser = new User(req.body);
  const returnRegister = await objUser.preRegister();

  if (returnRegister.id) {
    res.status(200).json({
      success: true,
      message: returnRegister,
    });
  } else {
    res.status(500).json({
      success: false,
      message: returnRegister,
    });
  }
};

exports.signup = async (req, res) => {
  const objUser = new User(req.body);
  const returnRegister = await objUser.register();

  if (returnRegister.id) {
    res.status(200).json({
      success: true,
      message: returnRegister,
    });
  } else {
    res.status(500).json({
      success: false,
      message: returnRegister,
    });
  }
};

exports.signin = async (req, res) => {
  const objUser = new User(req.body);
  const returnEnter = await objUser.signin();

  if (returnEnter.id) {
    res.status(200).json({
      success: true,
      message: returnEnter,
    });
  } else {
    res.status(403).json({
      success: false,
      message: returnEnter,
    });
  }
};

exports.getUser = async (req, res) => {
  const returnDatabase = await searchById(req.params.id);
  if (returnDatabase) {
    res.status(200).json({
      success: true,
      message: returnDatabase,
    });
  } else {
    res.status(404).json({
      success: false,
      message: returnDatabase,
    });
  }
};

exports.getAll = async (req, res) => {
  const returnDatabase = await list();
  if (returnDatabase) {
    res.status(200).json({
      success: true,
      message: returnDatabase,
    });
  } else {
    res.status(404).json({
      success: false,
      message: returnDatabase,
    });
  }
};

exports.update = async (req, res) => {
  const objUser = new User(req.body);
  const returnUpdate = await objUser.update(req.params);

  if (returnUpdate.id) {
    res.status(200).json({
      success: true,
      message: returnUpdate,
    });
  } else {
    res.status(404).json({
      success: false,
      message: returnUpdate,
    });
  }
};

exports.remove = async (req, res) => {
  const objUser = new User(req.body);
  const returnRemove = await objUser.delete(req.params);

  if (returnRemove) {
    res.status(200).json({
      success: true,
      message: returnRemove,
    });
  } else {
    res.status(404).json({
      success: false,
      message: returnRemove,
    });
  }
};
