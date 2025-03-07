import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
    getConversations,
    createConversation, getSingleConversation
    , updateConversation
} from "../Controller/conversation.controller.js";
const router = express.Router();

router.get("/", verifyToken, getConversations);
router.post("/", verifyToken, createConversation);
router.get("/single/:id", verifyToken, getSingleConversation);
router.put("/:id", verifyToken, updateConversation);

export default router;