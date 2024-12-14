import { z } from "zod";

//  {

//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: "User",
//     },

//     orderItems: [
//       {
//         name: { type: String, required: true },
//         qty: { type: Number, required: true },
//         image: { type: String, required: true },
//         price: { type: Number, required: true },
//         product: {
//           type: mongoose.Schema.Types.ObjectId,
//           required: true,
//           ref: "Product",
//         },
//       },
//     ],
//     shippingAddress: {
//       address: { type: String, required: true },
//       city: { type: String, required: true },
//       postalCode: { type: String, required: true },
//       country: { type: String, required: true },
//     },
//     paymentMethod: {
//       type: String,
//       required: true,
//     },
//     paymentResult: {
//       id: { type: String },
//       status: { type: String },
//       update_time: { type: String },
//       email_address: { type: String },
//     },
//     itemsPrice: {
//       type: Number,
//       required: true,
//       default: 0.0,
//     },
//     taxPrice: {
//       type: Number,
//       required: true,
//       default: 0.0,
//     },
//     shippingPrice: {
//       type: Number,
//       required: true,
//       default: 0.0,
//     },
//     totalPrice: {
//       type: Number,
//       required: true,
//       default: 0.0,
//     },
//     isPaid: {
//       type: Boolean,
//       required: true,
//       default: false,
//     },
//     paidAt: {
//       type: Date,
//     },
//     isDelivered: {
//       type: Boolean,
//       required: true,
//     },
//     deliveredAt: {
//       type: Date,
//     },
//   },

const createOrderSchema = z.object({
  orderItems: z.array(
    z.object({
      name: z.string(),
      qty: z.number(),
      image: z.string(),
      price: z.number(),
      product: z.string(),
    })
  ),

  shippingAddress: z.object({
    address: z.string(),
    city: z.string(),
    postalCode: z.string(),
    country: z.string(),
  }),

  paymentMethod: z.string(),

  itemsPrice: z.number(),
  shippingPrice: z.number(),

  taxPrice: z.number(),

  totalPrice: z.number(),
});

const createOrderExtendedSchema = createOrderSchema.extend({
  paymentResult: z
    .object({
      id: z.string(),
      status: z.string(),
      update_time: z.string(),
      email_address: z.string(),
    })
    .optional(),

  isPaid: z.boolean().optional(),

  paidAt: z.date().optional(),

  isDelivered: z.boolean().optional(),

  deliveredAt: z.date().optional(),
});

export { createOrderExtendedSchema };
