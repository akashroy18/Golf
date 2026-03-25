import express from "express"
import { getDashboardStats } from "../controllers/admin.controller.js"
import { auth_middleware, adminOnly } from "../middleware/auth.middleware.js"

const router = express.Router()

router.get("/stats", auth_middleware, adminOnly, getDashboardStats)

export default router