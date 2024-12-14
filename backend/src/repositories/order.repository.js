import CrudRepository from "./crud.repository.js";

import Order from "../models/Order.js";

class OrderRepository extends CrudRepository {
  constructor() {
    super(Order);
  }
}


export default OrderRepository