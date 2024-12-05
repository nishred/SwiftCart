import CrudRepository from "./crud.repository.js";
import User from "../models/User.js";

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  async getByEmail(email) {
    return await this.model.findOne({ email });
  }
}

export default UserRepository;
