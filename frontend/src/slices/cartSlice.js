import { createSlice } from "@reduxjs/toolkit";

function loadFromLocalStorage() {
  let cart = localStorage.getItem("cart");

  if (cart) {
    cart = JSON.parse(cart).cart;
  }

  return { cart: cart || [], shipping: {} };
}

const initialCartState = {
  cart: [],
  shipping: {
    address: "",
    city: "",
    postalCode: "",
    country: "",
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addProduct(state, action) {
      state.cart.push({
        id: action.payload.id,
        name: action.payload.name,
        image: action.payload.image,
        price: action.payload.price,
        quantity: 1,
        quantityInStock: action.payload.quantityInStock,
      });
    },

    increaseQuantity(state, action) {
      const product = state.cart.find(
        (product) => product.id === action.payload.id
      );

      if (product.quantityInStock > product.quantity) {
        product.quantity++;
      }
    },

    decreaseQuantity(state, action) {
      const product = state.cart.find(
        (product) => product.id === action.payload.id
      );

      if (product.quantity > 1) product.quantity--;
      else {
        state.cart = state.cart.filter(
          (product) => product.id !== action.payload.id
        );
      }
    },

    removeProduct(state, action) {
      state.cart = state.cart.filter((product) => {
        return product.id !== action.payload.id;
      });
    },
    addShipping(state, action) {
      Object.keys(action.payload).forEach((key) => {
        state.shipping[key] = action.payload[key];
      });
    },
  },
});

export const {
  addProduct,
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
  addShipping,
} = cartSlice.actions;

export default cartSlice.reducer;
