import express from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";
const router = express.Router();

//Authentication Routes
//--> /api/auth/signup When user visit this path [signup] controller will be called uder [auth.controller.js] file.
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router; 
