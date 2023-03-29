const { News } = require("../models/news");

exports.publish = async (req, res) => {
  const objNews = new News(req.body);
  const returnCreate = await objNews.publishText();

  if (returnCreate.id) {
    res.status(201).json({
      success: true,
      message: returnCreate,
    });
  } else if (returnCreate.code === "P2000") {
    res.status(400).json({
      success: false,
      message: "The provided value for the column is too long for the column's type.",
    });
  } else if (returnCreate.code === "P2003") {
    res.status(400).json({
      success: false,
      message: `Foreign key constraint failed on the field: authorId`,
    });
  } else {
    res.status(500).json({
      success: false,
      message: returnCreate,
    });
  }
};

exports.getNews = async (req, res) => {
  const objNews = new News(req.body);
  const returnConsult = await objNews.consultText(req.params);

  if (returnConsult) {
    res.status(200).json({
      success: true,
      message: returnConsult,
    });
  } else if (returnConsult === null) {
    res.status(404).json({
      success: false,
      message: "News not found",
    });
  }  else {
    res.status(500).json({
      success: false,
      message: returnConsult,
    });
  }
};

exports.getAll = async (req, res) => {
  const objNews = new News(req.body);
  const returnList = await objNews.listTexts();

  if (returnList) {
    res.status(200).json({
      success: true,
      message: returnList,
    });
  } else {
    res.status(500).json({
      success: false,
      message: returnList,
    });
  }
};

exports.update = async (req, res) => {
  const objNews = new News(req.body);
  const returnUpdate = await objNews.changeText(req.params);

  if (returnUpdate.id) {
    res.status(200).json({
      success: true,
      message: returnUpdate,
    });
  } else if (returnUpdate.code === "P2025") {
    res.status(404).json({
      success: false,
      message: "An operation failed because it depends on one or more records that were required but not found",
    });
  } else if (returnUpdate.code === "P2000") {
    res.status(400).json({
      success: false,
      message: "The provided value for the column is too long for the column's type.",
    });
  } else if (returnUpdate.code === "P2003") {
    res.status(400).json({
      success: false,
      message: `Foreign key constraint failed on the field: authorId`,
    });
  } else {
    res.status(500).json({
      success: false,
      message: returnUpdate,
    });
  }
};

exports.remove = async (req, res) => {
  const objNews = new News(req.body);
  const returnRemove = await objNews.deleteText(req.params);

  if (returnRemove.id) {
    res.status(200).json({
      success: true,
      message: returnRemove,
    });
  } else if (returnRemove.code === "P2025") {
    res.status(404).json({
      success: false,
      message: "An operation failed because it depends on one or more records that were required but not found",
    });
  } else {
    res.status(500).json({
      success: false,
      message: returnRemove,
    });
  }
};
