const { gravar, buscarPorEmail, atualizar, remover } = require("../services/user.dao");
const bcrypt = require('bcrypt');

exports.User = class {

  constructor({
    nome,
    sobrenome,
    data_nascimento,
    email,
    senha,
    area_conhecimento,
    possui_conhecimento,
    tipo_acesso,
  }) {
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.data_nascimento = data_nascimento
    this.email = email;
    this.senha = senha;
    this.area_conhecimento = area_conhecimento;
    this.possui_conhecimento = possui_conhecimento;
    this.tipo_acesso = tipo_acesso;
  }



  async cadastrar() {
    // criptografar senha
    // precisa melhorar essa parte
    this.senha = await bcrypt.hash(this.senha, 10);
    // converter data de nascimento para o formato do banco de dados
    this.data_nascimento = new Date(this.data_nascimento);
    // salvar no banco de dados e retornar o usuário
    return await gravar(this);
  }

  async logar() { 
    // buscar o usuário no banco de dados
    const usuario = await buscarPorEmail(this.email);
    if (usuario && await bcrypt.compare(this.senha, usuario.senha)) { 
      return usuario;
    }
    return "Usuário ou senha incorretos";
  }

  async atualizar({ codigo_usuario }) {
    // atualizar os dados
    return await atualizar(codigo_usuario, this);
  }

  async excluir({ codigo_usuario }) {
    // excluir o usuário
    return await remover( codigo_usuario);
  }
};
