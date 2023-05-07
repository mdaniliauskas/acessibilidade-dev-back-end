const { Text } = require("./text");
const { save, list, update, remove, searchById, fullSearch, listByCategory } = require("../services/article.dao");

exports.Article = class extends Text {
  constructor({
    title,
    description,
    authorId,
    categoryId,
    tags
  }) {
    super({ title, description, authorId, categoryId, tags });
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

  async listTextsByCategory({ categoryId }) {
    return await listByCategory(categoryId);
  }

  async listTexts() {
    return await list();
  }

  async deleteText({ id }) {
    return await remove(id);
  }

};
