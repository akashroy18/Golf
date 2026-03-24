import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser";
import authroutes from './routes/auth.routes.js';

const app = express()
app.use(express.json())
app.use(cookieParser());
app.use("/api/v1/auth",authroutes)


export default app;
