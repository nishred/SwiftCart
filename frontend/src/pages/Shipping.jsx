import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addShipping } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const shipping = useSelector((store) => store.cart.shipping);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState(shipping.address || "");
  const [city, setCity] = useState(shipping.city || "");
  const [postalCode, setPostalCode] = useState(shipping.postalCode || "");
  const [country, setCountry] = useState(shipping.country || "");

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(
      addShipping({
        address,
        city,
        postalCode,
        country,
      })
    );

    navigate("/checkout/payment");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-[500px] mx-auto"
    >
      <h1 className="text-3xl font-bold uppercase">Shipping</h1>

      <div className="flex flex-col">
        <label>Address</label>
        <input
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          type="text"
          value={address}
          className="px-4 py-4 rounded-md bg-slate-200"
        />
      </div>

      <div className="flex flex-col">
        <label>City</label>
        <input
          onChange={(e) => {
            setCity(e.target.value);
          }}
          type="text"
          value={city}
          className="px-4 py-2 rounded-md bg-slate-200"
        />
      </div>

      <div className="flex flex-col">
        <label>Postal Code</label>
        <input
          onChange={(e) => {
            setPostalCode(e.target.value);
          }}
          type="text"
          value={postalCode}
          className="px-4 py-2 rounded-md bg-slate-200"
        />
      </div>

      <div className="flex flex-col">
        <label>Country</label>
        <input
          onChange={(e) => {
            setCountry(e.target.value);
          }}
          type="text"
          value={country}
          className="px-4 py-2 rounded-md bg-slate-200"
        />
      </div>

      <div className="flex">
        <button className="px-4 py-2 bg-slate-700 text-slate-200 ml-auto">
          Continue
        </button>
      </div>
    </form>
  );
};

export default Shipping;
