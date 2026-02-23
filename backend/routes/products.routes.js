import express from "express";
import products from '../models/products.model.js'
import mongoose from "mongoose";
import { protect, adminOnly } from "../middleware/auth.middleware.js";
import { createproduct, deleteproduct, getproducts, updateproduct } from "../controller/product.controller.js";

const router =express.Router();

router.get("/", getproducts);
router.post("/", protect, adminOnly, createproduct);
router.put("/:id", protect, adminOnly, updateproduct);
router.delete("/:id", protect, adminOnly, deleteproduct);
export default router;
