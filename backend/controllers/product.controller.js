import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  
  try {
    const products = await Product.find(); 
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error in Fetching products:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createProduct = async (req, res) => {
    // Defines a POST route to create a new product at "/api/products"...
  
    const product = req.body; // Retrieves the data sent by the user in the HTTP request body...
  
    if (!product.name || !product.price || !product.image) {
      return res
        .status(400)
        .json({ sucess: false, message: "Please fill all fields" });
    }
  
    const newProduct = new Product(product); // Creates a new product using the product model and the user's data...
  
    try {
      await newProduct.save(); // save the document to the database
      res.status(201).json({ success: true, data: newProduct }); // respond with the saved document
    } catch (error) {
      console.error("Error in Create product:", error.message);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }

  export const updateProduct = async (req, res) => {
    const { id } = req.params; // Extracts the product ID from the URL parameter ':id'...
    const product = req.body; // Extracts the product data sent by the client in the request body...
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error("Invalid ID format:", id);
      return res
        .status(404)
        .json({ success: false, message: "Invalid product ID" });
    }
  
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, product, {
        new: true,
      });
      res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
      res.status(500).json({ success: false, message: "Product not found" });
    }
  }

  export const deleteProduct = async (req, res) => {
    const { id } = req.params;
  
    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json({ success: true, message: "Product deleted" });
    } catch (error) {
      console.log("Error in Delete product:", error.message);
  
      res.status(404).json({ success: false, message: "Product not found" });
    }
  }

  