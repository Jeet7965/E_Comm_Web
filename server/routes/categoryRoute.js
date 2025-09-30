import e from "express";
import { getCategories,createCategory } from "../controllers/categoryController.js";
import { AuthVerifyToken, authorizeRoles } from "../MiddleWare/authVerify.js";

const router=e.Router();


router.post("/", AuthVerifyToken, authorizeRoles("admin","superAdmin"), createCategory);
router.get("/", getCategories);

export default router;