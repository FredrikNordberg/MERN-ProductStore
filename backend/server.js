import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js";


dotenv.config(); // Loads environment variables from a .env file...

const app = express(); // Creates an Express application...

app.use(express.json()); // Allows the server to handle JSON data sent in HTTP requests...

app.use("/api/products",productRoutes); // Mounts the product routes at '/api/products'...



// Starts the server and listens for requests on port 5000...
app.listen(5000, () => {
  connectDB(); // Calls the function to connect to the database...
  console.log("Server stated at http://localhost:5000");
});
