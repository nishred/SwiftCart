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

// paypal payment integration demo

// import React from "react";
// import { PayPalButtons } from "@paypal/react-paypal-js";

// const PayPalCheckout = () => {
//   // Render the PayPal Buttons
//   return (
//     <div>
//       <h1>Checkout with PayPal</h1>
//       <PayPalButtons
//         // Create the PayPal order when the button is clicked
//         createOrder={async (data, actions) => {
//           /**
//            * Intuition:
//            * 1. `createOrder` is triggered when the PayPal button is clicked.
//            * 2. Using `actions.order.create`, we tell PayPal how much we want to charge and any other order details.
//            */
//           try {
//             const orderID = await actions.order.create({
//               purchase_units: [
//                 {
//                   amount: {
//                     value: "10.00", // The total amount for this transaction
//                   },
//                 },
//               ],
//             });
//             /**
//              * Intuition:
//              * 1. `actions.order.create` returns a promise that resolves with the `orderID`.
//              * 2. The `orderID` uniquely identifies this transaction.
//              */
//             return orderID;
//           } catch (error) {
//             console.error("Error creating order:", error);
//             throw error;
//           }
//         }}

//         // Handle order approval after the customer completes the payment
//         onApprove={async (data, actions) => {
//           /**
//            * Intuition:
//            * 1. `onApprove` is triggered when the buyer approves the payment in PayPal.
//            * 2. We use `actions.order.capture` to finalize the transaction.
//            */
//           try {
//             const details = await actions.order.capture();
//             /**
//              * Intuition:
//              * 1. `actions.order.capture` captures the payment and returns the transaction details.
//              * 2. This is where we can log or display the successful transaction details.
//              */
//             alert(`Transaction completed by ${details.payer.name.given_name}`);
//             console.log("Transaction details:", details);
//           } catch (error) {
//             console.error("Error capturing order:", error);
//             throw error;
//           }
//         }}

//         // Handle errors during the process
//         onError={(err) => {
//           /**
//            * Intuition:
//            * 1. If something goes wrong (e.g., network error or user cancellation), this function is called.
//            * 2. Use this to log errors or show user-friendly messages.
//            */
//           console.error("PayPal Buttons Error:", err);
//           alert("Something went wrong with the payment. Please try again.");
//         }}
//       />
//     </div>
//   );
// };

// export default PayPalCheckout;
