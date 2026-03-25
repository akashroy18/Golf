import express from "express"
import { createOrder, verifyPayment } from "../controllers/payment.controller.js"
import { auth_middleware } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/create-order", auth_middleware, createOrder)
router.post("/verify", auth_middleware, verifyPayment)

export default router