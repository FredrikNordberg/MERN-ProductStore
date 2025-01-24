import mongoose from "mongoose";

const productSchema = new mongoose.Schema({ // create a new schema
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
}, {
    timestamps: true, // automatically create fields for when the document was created and last updated
});

const Product = mongoose.model("Product", productSchema); // create a model based on the schema

export default Product; // export the model