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

};
