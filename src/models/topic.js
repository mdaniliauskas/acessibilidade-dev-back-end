const { Text } = require("./text");
const { save, list, update, remove, searchById, fullSearch, listByCategory, listByAuthor, updateVotes } = require("../services/topic.dao");

exports.Topic = class extends Text {
  constructor({
    title,
    description,
    status,
    votes,
    authorId,
    categoryId,
    tags
  }) {
    super({ title, description, authorId, categoryId, tags });
    this.votes = votes;
    this.status = status;
  }

  async publishText() {
    return await save(this);
  }

  async changeText({ id }) {
    return await update(id, this);
  }

  async changeVotes({ id }) {
    return await updateVotes(id, this);
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

  async fullSearchList({ content }) {
    let returnList = await fullSearch(content);
    returnList = returnList.map((topic) => {
      return {
        ...topic,
        replies: topic.replies.length
      }
    })
    return returnList;
  }

  async listTextsByCategory({ categoryId }) {
    let returnList = await listByCategory(categoryId);
    returnList = returnList.map((topic) => {
      return {
        ...topic,
        replies: topic.replies.length
      }
    })
    return returnList;
  }

  async listTextsByAuthor({ authorId }) {
    let returnList = await listByAuthor(authorId);
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
