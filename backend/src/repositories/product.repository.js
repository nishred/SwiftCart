import Product from "../models/Product.js";
import CrudRepository from "./crud.repository.js";

class ProductRepository extends CrudRepository {
  constructor() {
    super(Product);
  }
}


export default ProductRepository;
