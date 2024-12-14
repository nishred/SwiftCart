import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-3xl">Order #{id}</h1>
    </div>
  );
};

export default OrderDetails;
