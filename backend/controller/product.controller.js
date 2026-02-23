import mongoose from "mongoose";
import Product from "../models/products.model.js";
import { sanitizeString, sanitizeURL, sanitizeNumber } from "../utils/sanitize.js";

// Validation helper - check if URL is valid
const isValidURL = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

// GET PRODUCTS
export const getproducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("error in fetching products:", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
};

// CREATE PRODUCT
export const createproduct = async (req, res) => {
  const { name, image, price } = req.body;

  // ✅ Check if all fields exist
  if (!name || !price || !image) {
    return res.status(400).json({
      success: false,
      message: "Please provide all fields (name, price, image)",
    });
  }

  // ✅ Validate product name
  const sanitizedName = sanitizeString(name);
  if (sanitizedName.length < 3) {
    return res.status(400).json({
      success: false,
      message: "Product name must be at least 3 characters long",
    });
  }

  if (sanitizedName.length > 100) {
    return res.status(400).json({
      success: false,
      message: "Product name must not exceed 100 characters",
    });
  }

  // ✅ Validate price
  const numPrice = sanitizeNumber(price);
  if (isNaN(numPrice)) {
    return res.status(400).json({
      success: false,
      message: "Price must be a valid number",
    });
  }

  if (numPrice <= 0) {
    return res.status(400).json({
      success: false,
      message: "Price must be greater than 0",
    });
  }

  if (numPrice > 1000000) {
    return res.status(400).json({
      success: false,
      message: "Price exceeds maximum allowed value",
    });
  }

  // ✅ Validate image URL
  const sanitizedImage = sanitizeURL(image);
  if (!sanitizedImage) {
    return res.status(400).json({
      success: false,
      message: "Image must be a valid URL",
    });
  }

  const newProduct = new Product({
    name: sanitizedName,
    image: sanitizedImage,
    price: numPrice,
  });

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("error in creation of product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE PRODUCT
export const updateproduct = async (req, res) => {
  const { id } = req.params;
  const { name, image, price } = req.body;

  // ✅ Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid product id" });
  }

  // ✅ Check if at least one field is provided
  if (!name && !price && !image) {
    return res.status(400).json({
      success: false,
      message: "Please provide at least one field to update",
    });
  }

  // ✅ Validate name if provided
  if (name) {
    const sanitizedName = sanitizeString(name);
    if (sanitizedName.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Product name must be at least 3 characters long",
      });
    }

    if (sanitizedName.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Product name must not exceed 100 characters",
      });
    }
  }

  // ✅ Validate price if provided
  if (price !== undefined) {
    const numPrice = sanitizeNumber(price);
    if (isNaN(numPrice)) {
      return res.status(400).json({
        success: false,
        message: "Price must be a valid number",
      });
    }

    if (numPrice <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be greater than 0",
      });
    }

    if (numPrice > 1000000) {
      return res.status(400).json({
        success: false,
        message: "Price exceeds maximum allowed value",
      });
    }
  }

  // ✅ Validate image URL if provided
  if (image) {
    const sanitizedImage = sanitizeURL(image);
    if (!sanitizedImage) {
      return res.status(400).json({
        success: false,
        message: "Image must be a valid URL",
      });
    }
  }

  try {
    const updateData = {};
    if (name) updateData.name = sanitizeString(name);
    if (price !== undefined) updateData.price = sanitizeNumber(price);
    if (image) updateData.image = sanitizeURL(image);

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE PRODUCT
export const deleteproduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "invalid product id" });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Error in deleting product:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
