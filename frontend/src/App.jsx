import React from "react";
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
import { Provider } from "react-redux";
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

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
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
              <Route path="checkout" element={<CheckoutLayout />}>
                <Route index element={<Shipping />} />
                <Route path="payment" element={<Payment />} />
                <Route path="placeorder" element={<PlaceOrder />} />
              </Route>
              <Route path="order/:id" element={<OrderDetails />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </Provider>
  );
};

export default App;
