const { Text } = require("./text");
const { save, list, update, remove, searchById, searchByTitle } = require("../services/topic.dao");

exports.Topic = class extends Text {
  constructor({
    title,
    description,
    status,
    authorId,
    categoryId,
    tags
  }) {
    super({ title, description, authorId, categoryId, tags });
    this.status = status;
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
    let returnList = await list();
    returnList = returnList.map((topic) => {
      return {
        ...topic,
        replies: topic.replies.length
      }
    })
    return returnList;
  }

  async listTextsByTitle({ title }) {
    let returnList = await searchByTitle(title);
    returnList = returnList.map((topic) => {
      return {
        ...topic,
        replies: topic.replies.length
      }
    })
    return returnList;
  }

  async deleteText({ id }) {
    return await remove(id);
  }

  async replyTopic() {

  }
};
