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

import {Provider} from "react-redux"

import {QueryClient,QueryClientProvider} from "@tanstack/react-query";

import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

import store from "./store"

const queryClient = new QueryClient();

const App = () => {
  return (

    <Provider store ={store} >
    <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={true} />
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
    </QueryClientProvider>
    </Provider>
  );
};

export default App;
