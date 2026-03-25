import express from "express"
import { updateWinnerStatus,getMyWinnings} from "../controllers/winner.controller.js"
import { auth_middleware, adminOnly } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/status", auth_middleware, adminOnly, updateWinnerStatus)
router.get("/my", auth_middleware, getMyWinnings)

export default router