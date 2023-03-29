exports.Text = class { 
  constructor({     
    title,
    description,
    authorId,
    categoryId,
    tags
  }) { 
    this.title = title;
    this.description = description;
    this.authorId = authorId;
    this.categoryId = categoryId;
    this.tags = tags;
  }

  async publishText() { }

  async changeText({ id }) { }

  async consultText({ id }) { }

  async listTexts() { }

  async deleteText({ id }) { }

  async searchSection() { }

};
