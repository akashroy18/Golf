import express from 'express'
import { registerUser,loginUser,logout } from "../controllers/auth.controller.js";
const router = express.Router()
router.post("/registerUser",registerUser)
router.post("/loginUser",loginUser)
router.get("/logout",logout)
export default router