import express from 'express'
import { getCategories,createCategory } from '../controllers/categoryController.js'
import { AuthVerifyToken } from '../MiddleWare/authVerify.js'


const router=express.Router();

router.post("/", AuthVerifyToken, createCategory);
router.get("/", getCategories);

export default router;