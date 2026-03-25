import express from 'express'
import { addScore,getScores } from '../controllers/score.controller.js'
import { auth_middleware } from '../middleware/auth.middleware.js'
const router = express.Router()
router.post('/addScore',auth_middleware,addScore)
router.get('/getScores',auth_middleware,getScores)
export default router
