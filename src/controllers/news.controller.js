const { News } = require("../models/news");
const { responseError } = require("../helpers/responseError");
const { Prisma } = require('@prisma/client');

exports.publish = async (req, res) => {
  const objNews = new News(req.body);
  const returnCreate = await objNews.publishText();

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
};

exports.getNews = async (req, res) => {
  const objNews = new News(req.body);
  const returnConsult = await objNews.consultText(req.params);

  if (returnConsult === null) {
    return res.status(404).json({
      success: false,
      message: "News not found",
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

exports.getAll = async (req, res) => {
  const objNews = new News(req.body);
  const returnList = await objNews.listTexts();
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
  const objNews = new News(req.body);
  const returnUpdate = await objNews.changeText(req.params);

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
  const objNews = new News(req.body);
  const returnRemove = await objNews.deleteText(req.params);
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
};
