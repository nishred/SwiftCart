import { useState } from "react";
import { useSearchParams, Outlet } from "react-router-dom";

import React from "react";

import styled from "styled-components";

const stages = ["sign in", "Shipping", "Payment", "Place Order"];

const StyledCheckoutLayout = styled.div`
  display: grid;
  margin: 0px auto;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

export const CheckoutLayoutContext = React.createContext();

const CheckoutLayout = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlStep = parseInt(searchParams.get("step") || 1);

  const [steps, setSteps] = useState(urlStep);

  const [order, setOrder] = useState({ paymentMethod: "paypal" });

  return (
    <CheckoutLayoutContext.Provider
      value={{ steps, setSteps, order, setOrder }}
    >
      <StyledCheckoutLayout>
        {stages.map((stage, idx) => {
          return (
            <div
              className={`text-xl font-bold uppercase ${
                idx <= steps ? "text-slate-700" : "text-slate-400"
              }`}
              key={stage}
            >
              {stage}
            </div>
          );
        })}
      </StyledCheckoutLayout>
      <div className="mt-12">
        <Outlet />
      </div>
    </CheckoutLayoutContext.Provider>
  );
};

export default CheckoutLayout;
