const { User } = require("../models/user");
const { responseError } = require("../helpers/responseError");
const { Prisma } = require('@prisma/client');

exports.preSignup = async (req, res) => {
  const objUser = new User(req.body);
  const returnRegister = await objUser.preRegister();

  if (returnRegister.id) {
    return res.status(200).json({
      success: true,
      message: returnRegister,
    });
  } 
  if (returnRegister instanceof Prisma.PrismaClientInitializationError) {
    return res.status(500).json({
      success: false,
      message: "Internal server error, please restart the server",
    });
  }
  if (returnRegister instanceof Prisma.PrismaClientValidationError) { 
    return res.status(400).json({
      success: false,
      message: "Incorrect field type provided in the JSON input",
    });
  }
  responseError[returnRegister.code](res);
};

exports.getUser = async (req, res) => {
  const objUser = new User(req.params);
  const returnConsult = await objUser.consultUser();
  if (returnConsult === null) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  if (returnConsult instanceof Prisma.PrismaClientInitializationError) {
    return res.status(500).json({
      success: false,
      message: "Internal server error, please restart the server",
    });
  }
  res.status(200).json({
    success: true,
    message: returnConsult,
  });
};

exports.getUserByEmail = async (req, res) => {
  const objUser = new User(req.params);
  const returnConsult = await objUser.consultUserByEmail();
  if (returnConsult === null) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  if (returnConsult instanceof Prisma.PrismaClientInitializationError) {
    return res.status(500).json({
      success: false,
      message: "Internal server error, please restart the server",
    });
  }
  res.status(200).json({
    success: true,
    message: returnConsult,
  });
};

exports.update = async (req, res) => {
  const objUser = new User(req.body);
  const returnUpdate = await objUser.update();
  if (returnUpdate.id) {
    return res.status(200).json({
      success: true,
      message: returnUpdate,
    });
  } 
  if (returnUpdate instanceof Prisma.PrismaClientInitializationError) {
    return res.status(500).json({
      success: false,
      message: "Internal server error, please restart the server",
    });
  }
  if (returnUpdate instanceof Prisma.PrismaClientValidationError) { 
    return res.status(400).json({
      success: false,
      message: "Incorrect field type provided in the JSON input",
    });
  }
  responseError[returnUpdate.code](res)
};

exports.remove = async (req, res) => {
  const objUser = new User(req.params);
  const returnRemove = await objUser.delete();
  if (returnRemove.id) {
    return res.status(200).json({
      success: true,
      message: returnRemove,
    });
  } 
  if (returnRemove instanceof Prisma.PrismaClientInitializationError) {
    return res.status(500).json({
      success: false,
      message: "Internal server error, please restart the server",
    });
  }
  responseError[returnRemove.code](res);
};
