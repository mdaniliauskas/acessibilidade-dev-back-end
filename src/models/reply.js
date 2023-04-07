const { save, list, update, remove, searchById } = require("../services/reply.dao");

exports.Reply = class {
  constructor({
    description,
    authorId,
    topicId,
  }) {
    this.description = description;
    this.authorId = authorId;
    this.topicId = topicId;
  }

  async publishText() { 
    return await save(this);
  }

  async changeText({ id }) { 
    return await update(id, this);
  }

  async consultText({ id }) { 
    return await searchById(id);
  }

  async listTexts() { 
    return await list();
  }

  async deleteText({ id }) { 
    return await remove(id);
  }

};
