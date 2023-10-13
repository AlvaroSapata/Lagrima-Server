const { Schema, model, default: mongoose } = require("mongoose");

const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);

module.exports = Order;