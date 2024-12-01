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
import { Link } from "react-router-dom";
import Rating from "./Rating";
import StyledLink from "./StyledLink";

const Product = ({ product }) => {
  return (
    <div className="p-4 w-56 border border-solid border-slate-200 flex flex-col gap-2">
      <img className="w-full" src={product.image} />

      <StyledLink to = {`product/${product._id}`}>
        <h2 className="capitalize font-semibold">{product.name}</h2>
      </StyledLink>

      <h3>
        <Rating rating={product.rating} />
        <span>{product.numReviews} reviews </span>
      </h3>

      <h3>${product.price}</h3>
    </div>
  );
};

export default Product;
