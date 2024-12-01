import mapArray from "../utils/mapArray";

import Star from "./Star";

const Rating = ({ rating, color = "#F3B431", size }) => {
  return (
    <span className="inline-flex">
      {mapArray(5).map((idx) => {
        return (
          <Star size={size} color={color} key={idx} value={rating - idx} />
        );
      })}
    </span>
  );
};

export default Rating;
