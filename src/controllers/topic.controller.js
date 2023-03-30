const { Topic } = require("../models/topic");
const { responseError } = require("../controllers/responseError");

exports.publish = async (req, res) => {
  const objTopic = new Topic(req.body);
  const returnCreate = await objTopic.publishText();
  if (returnCreate.id) {
    return res.status(201).json({
      success: true,
      message: returnCreate,
    });
  }
    
  try {
    responseError[returnCreate.code](res)
  }
  catch (error) {
    res.status(400).json({
      success: false,
      message: "Incorrect field type provided in the JSON input",
    });
  }
};

exports.getTopic = async (req, res) => {
  const objTopic = new Topic(req.body);
  const returnConsult = await objTopic.consultText(req.params);

  if (returnConsult === null) {
    return res.status(404).json({
      success: false,
      message: "Topic not found",
    });
  }
  res.status(200).json({
    success: true,
    message: returnConsult,
  });
  
};

exports.getAll = async (req, res) => {
  const objTopic = new Topic(req.body);
  const returnList = await objTopic.listTexts();

  res.status(200).json({
    success: true,
    message: returnList,
  });
};

exports.update = async (req, res) => {
  const objTopic = new Topic(req.body);
  const returnUpdate = await objTopic.changeText(req.params);

  if (returnUpdate.id) {
    return res.status(200).json({
      success: true,
      message: returnUpdate,
    });
  } 

  try {
    responseError[returnUpdate.code](res)
  }
  catch (error) {
    res.status(400).json({
      success: false,
      message: "Incorrect field type provided in the JSON input",
    });
  }
};

exports.remove = async (req, res) => {
  const objTopic = new Topic(req.body);
  const returnRemove = await objTopic.deleteText(req.params);

  if (returnRemove.id) {
    return res.status(200).json({
      success: true,
      message: returnRemove,
    });
  } 
  try {
    responseError[returnRemove.code](res)
  }
  catch (error) {
    res.status(400).json({
      success: false,
      message: "Incorrect field type provided in the JSON input",
    });
  }
};