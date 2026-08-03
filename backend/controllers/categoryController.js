import e from "express";
import Category from "../Models/category.js";
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      success: false,
      message: "Server Error:",
      error: error.message,
    });
  }
};

export const myCategory = async (req, res) => {
  try {
    const categories = await Category.findById({ _id: req.user._id })

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching user's categories:", error);
    res.status(500).json({
      success: false,
      message: "Server Error:",
      error: error.message,
    });
  }
}