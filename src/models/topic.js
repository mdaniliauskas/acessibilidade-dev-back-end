const { save, update, remove } = require("../services/topic.dao");

exports.Topic = class {
  constructor({     
    title,
    description,
    status,
    authorId,
    categoryId,
    tags
  }) {
    this.title = title;
    this.description = description;
    this.status = status;
    this.authorId = authorId;
    this.categoryId = categoryId;
    this.tags = tags;
  }

  async create() {
    return await save(this);
  }

  async update({ id }) {
    // atualizar os dados
    return await update(id, this);
  }

  async delete({ id }) {
    // excluir o tópico
    return await remove(id);
  }
};
