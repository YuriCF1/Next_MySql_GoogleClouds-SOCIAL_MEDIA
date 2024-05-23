import express from "express";
import { checkToken } from "../middleware/tokenValidation.js";
import { createComment, getComment } from "../controllers/comment.js";

const router = express.Router();

router.post("/", checkToken, createComment);
router.get("/", checkToken, getComment);

export default router;
