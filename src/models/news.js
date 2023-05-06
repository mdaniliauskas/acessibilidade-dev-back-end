const { Text } = require("./text");
const { save, list, update, remove, searchById, fullSearch } = require("../services/news.dao");

exports.News = class extends Text {
  constructor({
    title,
    description,
    source,
    link,
    authorId,
    categoryId,
    tags
  }) {
    super({ title, description, authorId, categoryId, tags });
    this.source = source;
    this.link = link;
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

  async fullSearchList({ content }) {
    return await fullSearch(content);
  }

  async listTexts() {
    return await list();
  }

  async deleteText({ id }) {
    return await remove(id);
  }

};
