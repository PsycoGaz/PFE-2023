import express from "express";
import {deleteUser, getUser} from "../Controller/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";
const router = express.Router();


router.delete("/:id",verifyToken, deleteUser );
router.get("/register", );
router.get("/login", );
router.get("/:id", verifyToken, getUser)
export default router; 