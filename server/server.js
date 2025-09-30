import express from 'express'
import mongoose from 'mongoose'
import dotenv from'dotenv'
import cors from 'cors'
import connectDB from './configdb.js'
import userRoute from './routes/userRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import subCategoryRoute from './routes/subCategoryRoute.js'
import productRoute from  './routes/productRoute.js'

dotenv.config({ path: "./setting.env" });

const app = express();
app.use(express.json());
app.use(cors())

connectDB()

const PORT =process.env.PORT || 3000


app.use("/api/users", userRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/subcategories", subCategoryRoute);
app.use("/api/products", productRoute);
 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});