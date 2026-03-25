import express from "express"
import { runDraw } from "../controllers/draw.controller.js"
import { auth_middleware, adminOnly } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/run", auth_middleware, adminOnly, runDraw)

export default router