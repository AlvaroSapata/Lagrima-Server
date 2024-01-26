const { Schema, model, default: mongoose } = require("mongoose");

const orderStatus = ["sin confirmar", "confimado"]

const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status:{
      type: String,
      enum: orderStatus,
      default: "sin confirmar"
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true
        },
        unitPrice: {
          type: Number,
          required: true
        }

      },
    ],
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
