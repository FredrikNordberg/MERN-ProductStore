import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

const app = express();

app.use(express.json()); // allows us to accept JSON data in the body

app.post("/api/products", async (req, res) => {
  const product = req.body; // user will send this data

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ sucess: false, message: "Please fill all fields" });
  }

  const newProduct = new Product(product); // create a new product document

  try {
    await newProduct.save(); // save the document to the database
    res.status(201).json({ success: true, data: newProduct }); // respond with the saved document
  } catch (error) {
    console.error("Error in Create product:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.listen(5000, () => {
  connectDB();
  console.log("Server stated at http://localhost:5000");
});
