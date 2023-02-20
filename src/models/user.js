const { gravar } = require("../services/user.dao");

exports.User = class {
  constructor({
    nome,
    sobrenome,
    data_nascimento,
    email,
    senha,
    area_conhecimento,
    possui_conhecimento,
  }) {
    this.nome = nome;
    this.sobrenome = sobrenome;
    //Converter data de nascimento para o formato do banco de dados
    this.data_nascimento = new Date(data_nascimento)
    this.email = email;
    this.senha = senha;
    this.area_conhecimento = area_conhecimento;
    this.possui_conhecimento = possui_conhecimento;
  }

  async cadastrar() {
    // criptografar senha
    //
    // salvar no banco de dados
    return await gravar(this);
    // retornar o usuário
  }
};
