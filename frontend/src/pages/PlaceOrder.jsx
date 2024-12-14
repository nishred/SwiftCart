import React, { useEffect } from "react";
import { CheckoutLayoutContext } from "./CheckoutLayout";
import { useSelector } from "react-redux";

import styled from "styled-components";

import { useCreateOrder } from "../hooks/useCreateOrder";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const tax = 200.99;

const OrderSummary = styled.ul`
  border-top: 1px solid black;
  border-bottom: 1px solid black;

  & li {
    border-bottom: 1px solid black;
    padding: 8px;
  }

  & li:last-child {
    border-bottom: none;
  }
`;

const OrderItem = styled.li`
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  column-gap: 1rem;
`;

const OrderList = styled.ul`
  & li {
    border-bottom: 2px solid #cbd5e1;
    padding: 16px 0px;
  }

  & li:last-child {
    border-bottom: none;
  }

  grid-column: 1/4;
`;

const PlaceOrderLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(1fr, 5);
  column-gap: 2rem;
`;

const PlaceOrder = () => {
  const { steps, setSteps, paymentMethod } = React.useContext(
    CheckoutLayoutContext
  );

  const { cart, shipping } = useSelector((store) => store.cart);

  const { mutate, isSuccess, data } = useCreateOrder();

  const navigate = useNavigate();

  const totalPrice = React.useMemo(() => {
    return cart.reduce((acc, ele) => {
      return acc + ele.price * ele.quantity;
    }, 0);
  }, [cart]);

  useEffect(() => {
    setSteps(3);
  }, []);

  useEffect(() => {
    if (data) {
  
      console.log(data)

      navigate(`/order/${data.data.order._id}`);
    }
  }, [data]);

  function handlePlaceOrder() {
    const newOrder = {
      orderItems: cart.map((item) => {
        return {
          name: item.name,
          product: item.id,
          image: item.image,
          price: item.price,
          qty: parseInt(item.quantity),
        };
      }),

      shippingAddress: {
        ...shipping,
      },

      paymentMethod,
      itemsPrice: totalPrice,
      shippingPrice: 0,
      taxPrice: tax,
      totalPrice: Number((totalPrice + tax).toFixed(2)),
    };

    console.log(newOrder)

    mutate(newOrder);
  }

  return (
    <PlaceOrderLayout>
      <OrderList>
        <li className="flex flex-col gap-2">
          <h1 className="text-3xl uppercase tracking-wider">Shipping</h1>

          <h2 className="text-xl">Address : {shipping.address}</h2>
        </li>

        <li className="flex flex-col gap-2">
          <h1 className="text-3xl uppercase tracking-wider">Payment Method</h1>

          <h2 className="text-xl">Method : {paymentMethod}</h2>
        </li>

        <li>
          <h1 className="text-3xl uppercase tracking-wider">Order Items</h1>
          <ul>
            {cart.map((item) => {
              return (
                <OrderItem key={item.id}>
                  <img className="w-20" src={item.image} />

                  <div className="text-center self-center">{item.name}</div>
                  <div className="text-center self-center">{`${
                    item.quantity
                  } X $${item.price} = $${item.price * item.quantity}`}</div>
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
            <span>${totalPrice}</span>
          </li>
          <li className="flex justify-between">
            <span>Shipping</span>
            <span>$0</span>
          </li>
          <li className="flex justify-between">
            <span>Tax</span>
            <span>${tax}</span>
          </li>
          <li className="flex justify-between">
            <span>Total</span>
            <span>${(totalPrice + tax).toFixed(2)}</span>
          </li>
        </OrderSummary>

        <div className="p-1">
          <button
            onClick={handlePlaceOrder}
            className="w-full py-2 bg-black text-slate-200 uppercase"
          >
            Place Order
          </button>
        </div>
      </div>
    </PlaceOrderLayout>
  );
};

export default PlaceOrder;
