import express from "express"
import { getCharities, selectCharity } from "../controllers/charity.controller.js"
import { auth_middleware } from "../middleware/auth.middleware.js"

const router = express.Router()

router.get("/", auth_middleware, getCharities)
router.post("/select", auth_middleware, selectCharity)

export default router