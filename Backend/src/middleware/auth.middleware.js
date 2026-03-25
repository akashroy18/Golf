import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
export const auth_middleware = async (req,res,next)=>{
    try {
        const token = req.cookies.user_token
        if(!token){
            return res.status(400).json({
                message:"unauthorized"
            })
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findById(decoded.id).select("-password")
        if (!user) {
        return res.status(401).json({ message: "User not found" })
        }
        req.user=user
        next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" })
    }
}
export const adminOnly = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Access denied"
        })
    }

    next()
}