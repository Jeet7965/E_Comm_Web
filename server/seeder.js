// seeder.js
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./configdb.js";
import CategaryModel from "./Model/CategaryModel.js";
import SubcategoryModel from "./Model/SubcategoryModel.js";
import ProductModel from "./Model/ProductModel.js";
import UserModel from "./Model/UserModel.js";

dotenv.config({ path: "./setting.env" });

const seedData = async () => {
  try {
    await connectDB();

    // 1️⃣ Clear old data
    await CategaryModel.deleteMany();
    await SubcategoryModel.deleteMany();
    await ProductModel.deleteMany();
    await UserModel.deleteMany();

    // 2️⃣ Insert Categories
    const categories = await CategaryModel.insertMany([
      { name: "Electronics" },
      { name: "Fashion" },
      { name: "Home Appliances" },
    ]);

    console.log("✅ Categories added");

    // 3️⃣ Insert SubCategories
    const subcategories = await SubcategoryModel.insertMany([
      { name: "Mobiles", category: categories[0]._id },
      { name: "Laptops", category: categories[0]._id },
      {name: "Men Clothing", category: categories[1]._id },
      { name: "Women Clothing", category: categories[1]._id },
    ]);

    console.log("✅ Subcategories added");

    // 4️⃣ Insert Products
    await ProductModel.insertMany([
      {
        name: "iPhone 15",
        description: "Latest Apple iPhone",
        price: 1200,
        category: categories[0]._id,
        subCategory: subcategories[0]._id,
        image: "iphone.jpg",
      },
      {
        name: "HP Laptop",
        description: "Powerful laptop for work",
        price: 800,
        category: categories[0]._id,
        subCategory: subcategories[1]._id,
        image: "hp-laptop.jpg",
      },
    ]);

    console.log("✅ Products added");

    // 5️⃣ Insert Users
    await UserModel.insertMany([
      {
        firstname: "John",
        lastname: "Doe",
        gender: "Male",
        email: "admin@example.com",
        password: "12345678", // plain text (⚠️ insecure, just for demo)
        role: "admin",
      },
      {
        firstname: "Jane",
        lastname: "Smith",
        gender: "Female",
        email: "user@example.com",
        password: "12345678",
        role: "user",
      },
    ]);

    console.log("✅ Users added");

    process.exit(); // exit the script
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
