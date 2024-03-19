import express from "express";
import { logout } from "../controllers/authUser.controller.js";

const router = express.Router();

router.post("/register", logout)

export default router;
