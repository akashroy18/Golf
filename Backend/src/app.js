import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser";
import authroutes from './routes/auth.routes.js';
import subscriptionRoutes from './routes/subscription.routes.js'
import Scorerouter from './routes/scores.routes.js'

const app = express()
app.use(express.json())
app.use(cookieParser());
app.use("/api/v1/auth",authroutes)
app.use("/api/v1/subscription",subscriptionRoutes)
app.use("/api/v1/scores",Scorerouter)


export default app;
