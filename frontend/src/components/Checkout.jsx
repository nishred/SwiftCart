import { PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import usePayOrder from "../hooks/usePayOrder";
import Loading from "./Loading";
import toast from "react-hot-toast";

export default function Checkout() {
  const [transaction, setTransaction] = useState(null);

  const { id: orderId } = useParams();

  const token = useSelector((store) => store.user.token);

  const { mutate, isLoading, isError, data } = usePayOrder(orderId);

  useEffect(() => {
    if (transaction) {

      const { id, payer, update_time, status } = transaction;


      const { email_address } = payer;

      const paymentDetails = {
        id,
        status,
        update_time,
        email_address,
      };

      mutate({ orderId, token, paymentDetails });

      setTransaction(null);
    }
  }, [transaction, mutate, orderId, token]);

  if (isLoading) return <Loading />;

  return (
    <div style={{ margin: "20px" }}>
      <h1>PayPal Payment Demo</h1>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: "10.00", // Amount in USD
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            setTransaction(details);
            toast("Transaction completed successfully");
          });
        }}
        onError={(err) => {
          console.error("PayPal Checkout Error:", err);
        }}
      />
    </div>
  );
}
