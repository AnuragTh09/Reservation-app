import express from "express";
import {  login } from "../controllers/authUser.controller.js";

const router = express.Router();

// router.get("/" , signup);
router.post("/login", login)

export default router;
