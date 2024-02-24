import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsers } from "../controllers/user.controller.js"; // dont forget to put .js at the end of file name because ES 

const router = express.Router();

router.get("/", protectRoute, getUsers);

export default router;