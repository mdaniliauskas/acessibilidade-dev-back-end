const { Topic } = require("../models/topic");
const { searchById, list } = require("../services/topic.dao");

exports.getTopic = async (req, res) => {
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
  const objTopic = new Topic(req.body);
  const returnUpdate = await objTopic.update(req.params);

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
  const objTopic = new Topic(req.body);
  const returnRemove = await objTopic.delete(req.params);

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
