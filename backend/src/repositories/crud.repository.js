
class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async getById(id) {
    return await this.model.findById(id);
  }

  async getAll() {
    return await this.model.find();
  }
}


export default CrudRepository;  
