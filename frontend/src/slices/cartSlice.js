import { createSlice } from "@reduxjs/toolkit";

function loadFromLocalStorage() {
  let cart = localStorage.getItem("cart");

  if (cart) {
    cart = JSON.parse(cart);
  }

  return cart;
}

const cartSlice = createSlice({
  name: "cart",
  initialState: loadFromLocalStorage() || { cart: [] },
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
  },
});

export const { addProduct, removeProduct, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
