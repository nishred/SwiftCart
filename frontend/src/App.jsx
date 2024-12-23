import React, { useEffect } from "react";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Container from "./components/Container";
import HomeScreen from "./pages/HomeScreen";
import AppLayout from "./pages/AppLayout";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import SignIn from "./pages/SignIn";
import Payment from "./pages/Payment";
import Shipping from "./pages/Shipping";
import Protected from "./components/Protected";
import { Provider, useDispatch, useSelector } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import store from "./store";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CheckoutLayout from "./pages/CheckoutLayout";
import PlaceOrder from "./pages/PlaceOrder";
import { Toaster } from "react-hot-toast";
import Order from "../../backend/src/models/Order";
import OrderDetails from "./pages/OrderDetails";

import Checkout from "./components/Checkout";

import { initialOptions } from "./utils/constants";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import { removeUser, addUser } from "./slices/userSlice";
import Orders from "./pages/Orders";
import UserList from "./pages/UserList";
import EditUser from "./pages/EditUser";

const queryClient = new QueryClient();

const App = () => {
  const token = useSelector((store) => store.user.token);

  const dispatch = useDispatch();

  const isAuthenticated = useSelector((store) => store.user.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) return;
    const id = setInterval(async () => {
      const response = await fetch("http://localhost:5000/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await response.json();

      if (!json.success) dispatch(removeUser());
    }, 1000);
  }, [token, isAuthenticated]);

  return (
    <PayPalScriptProvider options={initialOptions}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<HomeScreen />} />
              <Route path="product/:id" element={<ProductPage />} />
              <Route path="cart" element={<Cart />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="register" element={<Register />} />
              <Route
                path="profile"
                element={
                  <Protected>
                    <Profile />
                  </Protected>
                }
              />
              <Route
                path="checkout"
                element={
                  <Protected>
                    <CheckoutLayout />
                  </Protected>
                }
              >
                <Route index element={<Shipping />} />
                <Route path="payment" element={<Payment />} />
                <Route path="placeorder" element={<PlaceOrder />} />
              </Route>
              <Route
                path="order/:id"
                element={
                  <Protected>
                    <OrderDetails />
                  </Protected>
                }
              />

              <Route path="pay/:id" element={<Checkout />} />
              <Route path="orders" element={<Orders />} />
              <Route
                path="userlist"
                element={
                  <Protected isAdmin={true}>
                    <UserList />
                  </Protected>
                }
              />
              <Route
                path="edituser/:id"
                element={
                  <Protected isAdmin={true}>
                    <EditUser />
                  </Protected>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </PayPalScriptProvider>
  );
};

export default App;
