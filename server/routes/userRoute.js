import express from "express";
import { registerUser, loginUser, getProfile, getAllUsers, updateUserRole } from "../controllers/userController.js";
import { AuthVerifyToken, authorizeRoles } from '../MiddleWare/authVerify.js';

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", AuthVerifyToken, getProfile);
router.get("/users", AuthVerifyToken, authorizeRoles("admin","superAdmin"), getAllUsers);
router.put("/users/:id/role", AuthVerifyToken, authorizeRoles("superAdmin","admin"), updateUserRole);

export default router;
