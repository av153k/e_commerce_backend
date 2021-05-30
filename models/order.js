import mongoose from "mongoose";
const schema = mongoose.Schema;

const orderSchema = new schema({
  user: {
    type: schema.Types.ObjectId,
    ref: "user",
  },
  products: [
    {
      id: {
        type: String,
      },
      name: {
        type: String,
      },
      quantity: {
        type: Number,
        min: [1, "Quantity can not be less than 1"],
        default: 1,
        required: true,
      },
      price: {
        type: Number,
      },
    },
  ],
  bill: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("order", orderSchema);
export { Order };
