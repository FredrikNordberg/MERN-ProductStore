import express from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";

const router = express.Router();


// [GET ALL]
router.get("/", getProducts);
// [POST]
router.post("/", createProduct);
// [UPDATE]
router.put("/:id", updateProduct );
// [DELETE]
router.delete("/:id", deleteProduct);

export default router;
