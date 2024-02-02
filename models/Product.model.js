const { Schema, model } = require("mongoose");

// array with valid Types
const validTypes = ["Camiseta", "Riñonera", "Sudadera"];

// array with valid sizes
const validSizes = ["XS", "S", "M", "L", "XL", "XXL"];

// array with valid colors
const validColors = ["Negro", "Rojo", "Verdo", "Amarillo", "Blanco"];

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required."],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required."],
    },
    available: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: validTypes,
    },
    color: {
      type: [String],
      enum: validColors,
    },
    size: {
      type: [String],
      enum: validSizes,
    },
    stock: {
      type: Number,
      default: 1,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;
