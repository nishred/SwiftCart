import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { useMemo } from "react";

import Rating from "../components/Rating";
import { ThickDividerHorizontalIcon } from "@radix-ui/themes/dist/cjs/index.js";

import { useProduct } from "../hooks/useProduct";

import { Provider, useDispatch, useSelector } from "react-redux";

import Spinner from "../components/Spinner";

import CartButton from "../components/CartButton";

import { IMAGE_URL } from "../utils/constants";

import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import {
  addProduct,
  decreaseQuantity,
  increaseQuantity,
} from "../slices/cartSlice";

//  {
//     _id: '1',
//     name: 'Airpods Wireless Bluetooth Headphones',
//     image: '/images/airpods.jpg',
//     description:
//       'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
//     brand: 'Apple',
//     category: 'Electronics',
//     price: 89.99,
//     countInStock: 10,
//     rating: 4.5,
//     numReviews: 12,
//   }

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 2rem;
  margin-top: 32px;
  color: #475569;
`;

const ProductPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { product, isLoading, error } = useProduct(id);

  const productState = useSelector((store) => {
    return store.cart.cart.find((product) => product.id === id);
  });

  const dispatch = useDispatch();

  function handleAddToCart() {
    if (!isLoading) {
      dispatch(
        addProduct({
          id: product._id,
          name: product.name,
          image: product.image,
          quantityInStock: product.countInStock,
          price: product.price,
        })
      );
    }
  }

  if (isLoading) return <Spinner />;

  if (error) return <div>{error.message}</div>;

  return (
    <>
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="hover:underline"
      >
        Go back
      </button>

      <ProductContainer>
        <img
          src={`${IMAGE_URL}${product.image}`}
          className="col-start-1 col-end-3"
        />

        <div className="flex flex-col gap-4 col-start-3 col-end-4">
          <h1 className="text-3xl font-bold uppercase tracking-wide">
            {product.name}
          </h1>

          <div className="flex gap-2 items-center">
            <Rating rating={product.rating} />
            <span>{product.numReviews} reviews</span>
          </div>

          <h2>Price : ${product.price}</h2>

          <h3>Description : {product.description}</h3>
        </div>

        <div className="border border-solid border-slate-300 col-start-4 col-end-5 self-start">
          <div className="flex justify-between p-2 border-b border-solid border-slate-300">
            <span>Price:</span>
            <span>${product.price}</span>
          </div>

          <div className="flex justify-between p-2 border-b border-slate-300 border-solid">
            <span>Status:</span>
            <span
              className={
                product.countInStock === 0
                  ? "text-red-600 font-bold text-xl tracking-wider"
                  : "text-green-600 font-bold text-xl tracking-wider"
              }
            >
              {productState
                ? "In Cart"
                : product.countInStock > 0
                ? "In Stock"
                : "Out of Stock"}
            </span>
          </div>

          <div className="p-2">
            {!productState ? (
              <CartButton
                onClick={handleAddToCart}
                disabled={product.countInStock === 0}
              >
                Add to Cart
              </CartButton>
            ) : (
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    dispatch(decreaseQuantity({ id }));
                  }}
                >
                  <FaCircleMinus size={24} />
                </button>

                <span>{productState.quantity}</span>

                <button
                  onClick={() => {
                    dispatch(increaseQuantity({ id }));
                  }}
                >
                  <FaCirclePlus size={24} />
                </button>
              </div>
            )}
          </div>
        </div>
      </ProductContainer>
    </>
  );
};

export default ProductPage;
