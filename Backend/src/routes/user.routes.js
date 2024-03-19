import express from "express";
import { signup } from "../controllers/authUser.controller.js";

const router = express.Router();

// router.get("/" , signup);
router.post("/register", signup)

export default router;
