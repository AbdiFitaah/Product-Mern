import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    
    // Qeybtaan badal:
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Magaca Model-ka Category
      required: true,
    },

    image: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);