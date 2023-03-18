const { Topic } = require("../models/topic");
const { searchById, list } = require("../services/topic.dao");

exports.publish = async (req, res) => {
  const objTopic = new Topic(req.body);
  const returnCreate = await objTopic.create();

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

exports.getTopic = async (req, res) => {
  const returnDatabase = await searchById(req.params.id);
  if (returnDatabase) {
    res.status(200).json({
      success: true,
      message: returnDatabase,
    });
  } else if (returnDatabase === null) {
    res.status(404).json({
      success: false,
      message: "Topic not found",
    });
  }  else {
    res.status(500).json({
      success: false,
      message: returnCreate,
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
    res.status(500).json({
      success: false,
      message: returnDatabase,
    });
  }
};

exports.update = async (req, res) => {
  const objTopic = new Topic(req.body);
  const returnUpdate = await objTopic.update(req.params);

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
      message: returnDatabase,
    });
  }
};

exports.remove = async (req, res) => {
  const objTopic = new Topic(req.body);
  const returnRemove = await objTopic.delete(req.params);

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
      message: returnDatabase,
    });
  }
};
