import { createSlice } from "@reduxjs/toolkit";


const products = [
  {
    id : 1,
    name: "Airpods Wireless Bluetooth Headphones",
    image: "/images/airpods.jpg",
    price: 89.99,
    quantity : 2,
    quantityInStock: 10,
  },
  {
    id : 2,
    name: "iPhone 11 Pro 256GB Memory",
    image: "/images/phone.jpg",
    price: 599.99,
    quantity : 3,
    quantityInStock: 7,
  },
  {
    id : 3,
    name: "Cannon EOS 80D DSLR Camera",
    image: "/images/camera.jpg",
    price: 929.99,
    quantity : 4,
    quantityInStock: 5,
  },
  {
    id:4,
    name: "Sony Playstation 4 Pro White Version",
    image: "/images/playstation.jpg",
    price: 399.99,
    quantity : 5,
    quantityInStock: 11,
  },
  {
    id : 5,
    name: "Logitech G-Series Gaming Mouse",
    image: "/images/mouse.jpg",
    price: 49.99,
    quantity:1,
    quantityInStock: 7,
  },
];



const initialCartSlice = {
  cart : []
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartSlice,
  reducers: {
    addProduct(state, action) {
      state.cart.push({
       
        id : action.payload.id,
        name : action.payload.name,
        image : action.payload.image,
        price : action.payload.price,
        quantity : 1,
        quantityInStock : action.payload.quantityInStock
       

      });
    },

    increaseQuantity(state, action) {


      const product = state.cart.find((product) => product.id === action.payload.id);

      if (product.quantityInStock > product.quantity) {
        product.quantity++;
      }
    },

    decreaseQuantity(state, action) {
      const product = state.cart.find((product) => product.id === action.payload.id);

      if (product.quantity > 1) product.quantity--;
      else {
        state.cart = state.cart.filter((product) => product.id !== action.payload.id);
      }
    },

    removeProduct(state, action) {

      

      state.cart = state.cart.filter((product) => {
        return product.id !== action.payload.id;
      });
    },
  },
});


export const {addProduct,removeProduct,increaseQuantity,decreaseQuantity} = cartSlice.actions

export default cartSlice.reducer


