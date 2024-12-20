import CrudRepository from "./crud.repository.js";

import Order from "../models/Order.js";

class OrderRepository extends CrudRepository {
  constructor() {
    super(Order);
  }

  async updateOrderToPaid(orderId, paymentResult) {
    const updatedOrder = await this.model.findByIdAndUpdate(
      orderId,
      {
        isPaid: true,
        paidAt: Date.now(),

        paymentResult: {
          id: paymentResult.id,
          status: paymentResult.status,
          update_time: paymentResult.update_time,
          email_address: paymentResult.email_address,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return updatedOrder;
  }

  async getOrdersByUser(id) {
    const orders = await this.model.find({
      user: id,
    });

    return orders
  }
}

export default OrderRepository;
