const { Tool } = require("../models/tool");
const { responseError } = require("../helpers/responseError");
const { Prisma } = require('@prisma/client');

exports.publish = async (req, res) => {
  const objTool = new Tool(req.body);
  const returnCreate = await objTool.publishText();

  if (returnCreate.id) {
    return res.status(201).json({
      success: true,
      message: returnCreate,
    });
  }
  if (returnCreate instanceof Prisma.PrismaClientInitializationError) {
    return res.status(500).json({
      success: false,
      message: "Internal server error, please restart the server",
    });
  }
  if (returnCreate instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({
      success: false,
      message: "Incorrect field type provided in the JSON input",
    });
  }
  responseError[returnCreate.code](res)
};

exports.getTool = async (req, res) => {
  const objTool = new Tool(req.body);
  const returnConsult = await objTool.consultText(req.params);

  if (returnConsult === null) {
    return res.status(404).json({
      success: false,
      message: "Tool not found",
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

exports.getFullSearch = async (req, res) => {
  const objTool = new Tool(req.body);
  const returnList = await objTool.fullSearchList(req.params);
  if (returnList instanceof Prisma.PrismaClientInitializationError) {
    return res.status(500).json({
      success: false,
      message: "Internal server error, please restart the server",
    });
  }
  res.status(200).json({
    success: true,
    message: returnList,
  });
};

exports.getAll = async (req, res) => {
  const objTool = new Tool(req.body);
  const returnList = await objTool.listTexts();
  if (returnList instanceof Prisma.PrismaClientInitializationError) {
    return res.status(500).json({
      success: false,
      message: "Internal server error, please restart the server",
    });
  }
  res.status(200).json({
    success: true,
    message: returnList,
  });
};

exports.update = async (req, res) => {
  const objTool = new Tool(req.body);
  const returnUpdate = await objTool.changeText(req.params);

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
  const objTool = new Tool(req.body);
  const returnRemove = await objTool.deleteText(req.params);
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
  responseError[returnRemove.code](res)
};
