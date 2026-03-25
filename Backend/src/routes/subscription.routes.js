import express from 'express'
import { activateSubscription } from '../controllers/subscripition.controller.js'
import { auth_middleware } from '../middleware/auth.middleware.js'
const router = express.Router()
router.post("/activate",auth_middleware,activateSubscription)
export default router