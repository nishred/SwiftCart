import { useDispatch, useSelector } from "react-redux";

import Table from "../components/Table";

import { FaCirclePlus } from "react-icons/fa6";

import React from "react";

import { FaCircleMinus } from "react-icons/fa6";
import {
  decreaseQuantity,
  increaseQuantity,
  removeProduct,
} from "../slices/cartSlice";

import CartButton from "../components/CartButton";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((store) => store.cart.cart);

  const user = useSelector((store) => store.user);

  const isAuthenticated = Object.keys(user).length > 0;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  function handleIncrease(id) {
    dispatch(increaseQuantity({ id }));
  }

  function handleDecrease(id) {
    dispatch(decreaseQuantity({ id }));
  }

  console.log(cart);

  const totalPrice = React.useMemo(() => {
    if (cart) {
      return cart.reduce((acc, ele) => {
        return acc + ele.price;
      }, 0);
    }
  }, [cart]);

  if (!cart) return <h1>Your Cart is Empty</h1>;

  return (
    <>
      <h1 className="text-3xl uppercase tracking-wider font-bold text-slate-600 mb-4">
        Shopping cart
      </h1>
      <Table columns={"1fr 2fr 1fr 1fr 1fr"}>
        <Table.Header>
          <div>Image</div>
          <div>Name</div>
          <div>Quantity</div>
          <div>Price</div>
          <div></div>
        </Table.Header>

        <Table.Body>
          {cart.map((product) => {
            return (
              <Table.TableRow key={product.id}>
                <img src={product.image} />
                <div>{product.name}</div>
                <div className="flex items-center gap-2 self-start">
                  <button onClick={() => handleDecrease(product.id)}>
                    <FaCircleMinus color={"#1e293b"} />
                  </button>

                  <span>{product.quantity}</span>

                  <button onClick={() => handleIncrease(product.id)}>
                    <FaCirclePlus color="#1e293b" />
                  </button>
                </div>

                <div>${product.price}</div>

                <div>
                  <CartButton
                    onClick={() => {
                      dispatch(removeProduct({ id: product.id }));
                    }}
                  >
                    Remove
                  </CartButton>
                </div>
              </Table.TableRow>
            );
          })}
        </Table.Body>

        <Table.Footer>
          <div></div>
          <div></div>
          <div className="tracking-widest text-xl">Total Price</div>
          <div className=" tracking-widest text-xl">${totalPrice}</div>
          <div>
            <CartButton
              onClick={() => {
                
                if(isAuthenticated)
                  navigate("/checkout")
                else
                {

                   navigate("/signin?redirect=checkout")

                }

              }}
            >
              Checkout
            </CartButton>
          </div>
        </Table.Footer>
      </Table>
    </>
  );
};

export default Cart;
