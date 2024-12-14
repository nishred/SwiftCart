import { useEffect, useId } from "react";
import { CheckoutLayoutContext } from "./CheckoutLayout";

import React from "react";
import { set } from "zod";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const { steps, setSteps, paymentMethod, setPaymentMethod } = React.useContext(
    CheckoutLayoutContext
  );

  const id = useId()

  const navigate = useNavigate()


  useEffect(() => {
    setSteps(2);
  }, []);

  return (
    <div className="flex flex-col gap-3 max-w-[600px] mx-auto">
      <h1 className="uppercase text-4xl text-slate-700 font-semibold">Payment Method</h1>
      <h2 className="uppercase text-3xl text-slate-500">Select Method</h2>
      <div>
        <input
          type="radio"
          value={"paypal"}
          checked={paymentMethod === "paypal"}
          onChange={(e) => {
            setPaymentMethod("paypal");
          }}
          name="payment"
          id={`${id}-${"paypal"}`}
        />{" "}
        <label htmlFor={`${id}-${"paypal"}`}>PayPal or Credit Card</label>
      </div>

      <div>
        <input
          type="radio"
          value={"stripe"}
          checked={paymentMethod === "stripe"}
          onChange={(e) => {
            setPaymentMethod("stripe");
          }}
          name="payment"
          id={`${id}-${"stripe"}`}
        />{" "}
        <label htmlFor={`${id}-${"stripe"}`}>Stripe</label>
      </div>
      <div>
        <button onClick={() => {

            navigate("/checkout/placeorder")


        }} className="px-4 py-2 bg-slate-700 text-slate-200">
          Continue
        </button>
      </div>
    </div>
  );
};

export default Payment;
