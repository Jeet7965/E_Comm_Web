import express from "express";
import { createProduct, getProducts } from "../controllers/productController.js";
import { AuthVerifyToken, authorizeRoles } from "../MiddleWare/authVerify.js";

const router = express.Router();

router.post("/", AuthVerifyToken, authorizeRoles("admin","vendor"), createProduct);
router.get("/", getProducts);

export default router;
