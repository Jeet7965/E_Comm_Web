import express from "express";
import { createSubCategory, getSubCategories } from "../controllers/subCategoryController.js";
import { AuthVerifyToken, authorizeRoles } from "../MiddleWare/authVerify.js";

const router = express.Router();

router.post("/", AuthVerifyToken, authorizeRoles("admin","superAdmin"), createSubCategory);
router.get("/", getSubCategories);

export default router;