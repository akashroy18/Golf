import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser"

import authroutes from './routes/auth.routes.js'
import subscriptionRoutes from './routes/subscription.routes.js'
import Scorerouter from './routes/scores.routes.js'
import adminRoutes from './routes/admin.routes.js'
import drawRoutes from './routes/draw.routes.js'
import winnerRoutes from './routes/winner.routes.js'
import paymentRoutes from "./routes/payment.routes.js"
import charityRoutes from "./routes/charity.routes.js"

const app = express()

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://golf-frontend-liard.vercel.app"
  ],
  credentials: true
}));

app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/auth", authroutes)
app.use("/api/v1/subscription", subscriptionRoutes)
app.use("/api/v1/scores", Scorerouter)
app.use("/api/v1/admin", adminRoutes)
app.use("/api/v1/draw", drawRoutes)
app.use("/api/v1/winner", winnerRoutes)
app.use("/api/v1/payment", paymentRoutes)
app.use("/api/v1/charity", charityRoutes)

export default app
