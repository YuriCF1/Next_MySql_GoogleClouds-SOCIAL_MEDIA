import express from "express";
import { addLike, getLikes, deleteLike } from "../controllers/likes.js";
import { checkToken } from "../middleware/tokenValidation.js";

const router = express.Router();

router.post("/", checkToken, addLike);
router.get("/", checkToken, getLikes);
router.delete("/", checkToken, deleteLike);

export default router;
