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
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomeScreen />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="cart" element={<Cart />} />
          <Route path="signin" element={<SignIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
