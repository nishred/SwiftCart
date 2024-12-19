import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchOrder } from "../api/order";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import Message from "../components/Message";

import usePayOrder from "../hooks/usePayOrder";

import {
  OrderItem,
  OrderList,
  OrderSummary,
  PlaceOrderLayout,
} from "./PlaceOrder";

const OrderDetails = () => {
  const { id } = useParams();

  const token = useSelector((store) => store.user.token);

  const { data, isLoading, error } = useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      return await fetchOrder(id, token);
    },
  });

  const navigate = useNavigate();

  if (isLoading) return <Loading />;

  const { order } = data.data;

  const cart = order.orderItems;

  const shipping = order.shippingAddress;

  function handlePay() {
    navigate(`/pay/${id}`);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-700 uppercase">
        Order {id}
      </h1>

      <PlaceOrderLayout>
        <OrderList>
          <li className="flex flex-col gap-2">
            <h1 className="text-3xl uppercase tracking-wider">Shipping</h1>

            <h2>Name : {order.user.name}</h2>

            <h2>Email : {order.user.email}</h2>

            <h2 className="text-xl">Address : {shipping.address}</h2>

            <Message variant={order.isDelivered ? "success" : "danger"}>
              {order.isDelivered
                ? `Delivered at : ${order.deliveredAt}`
                : "Not Delivered"}
            </Message>
          </li>

          <li className="flex flex-col gap-2">
            <h1 className="text-3xl uppercase tracking-wider">
              Payment Method
            </h1>

            <h2 className="text-xl">Method : {order.paymentMethod}</h2>

            <Message variant={order.isPaid ? "success" : "danger"}>
              {order.isPaid ? "Paid" : "Not Paid"}
            </Message>
          </li>

          <li>
            <h1 className="text-3xl uppercase tracking-wider">Order Items</h1>
            <ul>
              {cart.map((item) => {
                return (
                  <OrderItem key={item.id}>
                    <img className="w-20" src={item.image} />

                    <div className="text-center self-center">{item.name}</div>
                    <div className="text-center self-center">{`${item.qty} X $${
                      item.price
                    } = $${item.price * item.qty}`}</div>
                  </OrderItem>
                );
              })}
            </ul>
          </li>
        </OrderList>

        <div
          style={{ gridColumn: "4/6" }}
          className="border border-solid border-black self-start"
        >
          <h1 className="text-3xl uppercase p-4">Order Summary</h1>
          <OrderSummary>
            <li className="flex justify-between">
              <span>Items</span>
              <span>${order.totalPrice}</span>
            </li>
            <li className="flex justify-between">
              <span>Shipping</span>
              <span>${order.shippingPrice}</span>
            </li>
            <li className="flex justify-between">
              <span>Tax</span>
              <span>${order.taxPrice}</span>
            </li>
            <li className="flex justify-between">
              <span>Total</span>
              <span>${order.totalPrice}</span>
            </li>
          </OrderSummary>

          {!order.isPaid && (
            <div className="p-1">
              <button
                onClick={handlePay}
                className="w-full py-2 bg-black text-slate-200 uppercase"
              >
                Pay
              </button>
            </div>
          )}
        </div>
      </PlaceOrderLayout>
    </div>
  );
};

export default OrderDetails;
