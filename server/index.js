import dotenv from 'dotenv';
import express from 'express'
import connectDB from './configdb.js';
import mongoose from 'mongoose';
import CategaryModel from './Model/CategaryModel.js';
import SubcategoryModel from './Model/SubcategoryModel.js';
import ProductModel from './Model/ProductModel.js';
import BannerModel from './Model/BannerModel.js';
import UserModel from './Model/UserModel.js'
import jwt from 'jsonwebtoken';

import { AuthVerifyToken } from './MiddleWare/authVerify.js';
const app = express();

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 3000
app.use(express.json())

connectDB()

app.get("/", (req, res) => {
  res.send("Hello from Express + JSON Server!");
});



app.post('/api/category', AuthVerifyToken, async (req, resp) => {
  try {
    const { category } = req.body;

    if (!category) {
      return resp.status(400).json({ message: "Category is required" });
    }

    const newCategory = await CategaryModel.insertOne({ category });

    resp.status(201).json({
      message: "Category created Successfully!",
      success: true,
      data: newCategory
    });

  } catch (error) {
    console.error(error);
    resp.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
});


app.post('/api/sub-category/:id',AuthVerifyToken, async (req, resp) => {
  try {
    const { subCategory } = req.body;
    const id = req.params.id

    if (!subCategory) {
      return resp.json({ message: "SubCategory name is required" });
    }
    const category = await CategaryModel.findById(id);
    if (!category) {
      return resp.status(404).json({ message: "Category not found" });
    }

    const newSubCategory = await SubcategoryModel.insertOne({ subCategory, category: id });

    resp.status(201).json({
      message: "SubCategory created Successfully!",
      success: true,
      data: newSubCategory
    });

  } catch (error) {
    console.error(error);
    resp.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
});


app.get('/api/products', AuthVerifyToken, async (req, resp) => {
  try {

    const products = await ProductModel.find().populate("category", "name")
      .populate("subCategory", "subCategory");
    resp.json({ success: true, count: products.length, data: products });
  } catch (error) {
    resp.json({ success: false, message: error.message });
  }
});


// app.post('/api/products/:categoryId', async (req, res) => {
//   try {
//     const { name, description, price, subCategoryId, image } = req.body;
//     const categoryId = req.params.categoryId;

//     // Validate required fields
//     if (!name || !description || !price || !subCategoryId) {
//       return res.json({ message: "All required fields must be provided" });
//     }

//     // Check if category exists
//     const category = await CategaryModel.findById(categoryId);
//     if (!category) {
//       return res.json({ message: "Category not found" });
//     }

//     // Check if subcategory exists and belongs to the category
//     const subCategory = await SubcategoryModel.findById(subCategoryId);
//     if (!subCategory) {
//       return res.json({ message: "SubCategory not found" });
//     }
//     if (subCategory.category.toString() !== categoryId) {
//       return res.json({ message: "SubCategory does not belong to this Category" });
//     }

//     // Create product
//     const product = await ProductModel.create({
//       name,
//       description,
//       price,
//       category: categoryId,
//       subCategory: subCategoryId,
//       image
//     });

//     res.status(201).json({
//       success: true,
//       message: "Product created successfully!",
//       data: product
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message
//     });
//   }
// });




app.post('/singup', async (req, resp) => {
  try {

    const users = await UserModel.findOne({ email: req.body.email })
    if (users) {

      return resp.send({
        message: "User already exists",
        success: false

      })
    }
    const newuser = new UserModel(req.body)
    await newuser.save()
    resp.send({
      message: "User created successfully",
      success: true,
    })
  } catch (error) {
    console.error(error);
    resp.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
})

app.post("/login", async (req, resp) => {
  try {
    const { email, password } = req.body;

    // Find user and include role
    const user = await UserModel.findOne({ email }).select("password role name email");
    if (!user) {
      return resp.status(400).send({
        message: "User does not exist",
        success: false,
      });
    }

    // Direct password check (⚠️ plain text, not secure)
    if (password !== user.password) {
      return resp.status(400).send({
        message: "Invalid credentials",
        success: false,
      });
    }

    // Generate JWT with role
    const authToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "2d" }
    );

    resp.status(200).send({
      message: "User login successful",
      success: true,
      token: authToken,
      role: user.role,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    console.error(error);
    resp.status(500).send({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
