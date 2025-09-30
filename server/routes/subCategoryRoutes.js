import express from "express";
import { createSubCategory, getSubCategories } from "../controllers/subCategoryController.js";
import { AuthVerifyToken } from "../MiddleWare/authVerify.js";

const router = express.Router();

router.post("/", AuthVerifyToken, createSubCategory);
router.get("/", getSubCategories);

export default router;
