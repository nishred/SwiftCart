import styled from "styled-components";

import Table from "../components/Table";
import useOrders from "../hooks/useOrders";
import { Link } from "react-router-dom";

const Orders = () => {
  const { orders, isLoading, error } = useOrders();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <h1>Orders</h1>
      <Table columns={"2fr 3fr 1fr 1fr"}>
        <Table.Header>
          <div>order id</div>

          <div>Items</div>

          <div>total price</div>

          <div>status</div>
        </Table.Header>

        <Table.Body>
          {orders.map((order, idx) => {
            return (
              <Table.TableRow key={order._id}>
                <div>
                  <Link className="hover:underline" to={`/order/${order._id}`}>{order._id}</Link>
                </div>

                <div className="flex flex-col gap-2">
                  {order.orderItems.map((item) => {
                    return (
                      <div key={item._id} className="flex gap-2">
                        <div>
                          <img className="w-[100px]" src={item.image} />
                        </div>

                        <div>
                          {item.name}({item.qty})
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div>{order.totalPrice}</div>

                <div>
                  <div>{order.isPaid ? "paid" : "Not Paid"}</div>
                  <div>{order.isDelivered ? "delivered" : "not delivered"}</div>
                </div>
              </Table.TableRow>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
};

export default Orders;
