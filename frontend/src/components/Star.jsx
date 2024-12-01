import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";

const Star = ({ value,color,size }) => {

    console.log(value,typeof(value))
 
  return value <= 0 ? (
    <FaRegStar size={size} color={color}/>
  ) : value >= 1 ? (
    <FaStar color={color} size={size} />
  ) : (
    <FaStarHalfAlt  color={color} size={size}/>
  );
};

export default Star;
