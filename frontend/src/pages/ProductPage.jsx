import { Link, useNavigate, useParams } from "react-router-dom";
import products from "../products";
import styled from "styled-components";

import { useMemo } from "react";

import Rating from "../components/Rating";
import { ThickDividerHorizontalIcon } from "@radix-ui/themes/dist/cjs/index.js";

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

const CartButton = styled.button`
  display: inline-block;
  width: 100%;
  padding: 8px;
  background-color: #0f172a;
  color: #f8fafc;
  border: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;

  &:disabled {
    background-color: #94a3b8;
    cursor: not-allowed;
  }
`;

const ProductPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const product = useMemo(() => {
    return products.find((p) => {
      return p._id === id;
    });
  }, [id]);

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
        <img src={product.image} className="col-start-1 col-end-3"/>



        <div className="flex flex-col gap-4 col-start-3 col-end-4">
          <h1 className="text-3xl font-bold uppercase tracking-wide">{product.name}</h1>

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
            <span>
              {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <div className="p-2">
          <CartButton disabled={product.countInStock === 0}>
            Add to Cart
          </CartButton>
          </div>
        </div>


      </ProductContainer>
    </>
  );
};

export default ProductPage;
