class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async getById(id, selectObj) {
    return await this.model.findById(id).populate(selectObj);
  }

  async getAll() {
    return await this.model.find();
  }

  async create(data) {
    return await this.model.create(data);
  }

  async update(id, data) {
    return await this.model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }
}

export default CrudRepository;
