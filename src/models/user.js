const { preSave, searchById, list, update, remove } = require("../services/user.dao");

exports.User = class {
  constructor({
    id,
    first_name,
    last_name,
    birth_date,
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
    this.specialist_area = specialist_area;
    this.disability = disability;
    this.access_control = access_control;
    this.completedProfile = completedProfile;
  }

  async preRegister() {
    return await preSave(this);
  }

  async consultUser() { 
    return await searchById(this.id);
  }

  async update() {
    // atualizar os dados
    return await update(this);
  }
  
  async delete() {
    // excluir o usuário
    return await remove(this.id);
  }
};
