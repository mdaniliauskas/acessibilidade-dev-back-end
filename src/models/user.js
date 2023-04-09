const {
  save,
  preSave,
  searchByEmail,
  update,
  remove,
} = require("../services/user.dao");
const bcrypt = require("bcrypt");

exports.User = class {
  constructor({
    id,
    first_name,
    last_name,
    birth_date,
    password,
    email,
    specialist_area,
    disability,
    access_control,
    completedProfile,
  }) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.birth_date = birth_date;
    this.email = email;
    this.password = password;
    this.specialist_area = specialist_area;
    this.disability = disability;
    this.access_control = access_control;
    this.completedProfile = completedProfile;
  }

  async preRegister() {
    return await preSave({ id: this.id, email: this.email });
  }

  async register() {
    // criptografar senha
    // precisa melhorar essa parte
    this.password = await bcrypt.hash(this.password, 10);
    // converter data de nascimento para o formato do banco de dados
    this.birth_date = new Date(this.birth_date);
    // salvar no banco de dados e retornar o usuário
    return await save(this);
  }

  async signin() {
    // buscar o usuário no banco de dados
    const user = await searchByEmail(this.email);
    if (user && (await bcrypt.compare(this.password, user.password))) {
      return user;
    }
    return "Usuário ou senha incorretos";
  }

  async update({ id }) {
    // atualizar os dados
    return await update(id, this);
  }

  async delete({ id }) {
    // excluir o usuário
    return await remove(id);
  }
};
