import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            phone,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User registered successfully",
            user
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user (exclude password)
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({
                message: "User not registered"
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }

        // Generate token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Remove sensitive data
        const { password: _, ...safeUser } = user._doc;

        // Set cookie
        res.cookie("user_token", token, {
            httpOnly: true,
            secure: false // change to true in production (HTTPS)
        });

        // Send response
        res.status(200).json({
            message: "Login successfully",
            success: true,
            user: safeUser
        });

    } catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
};
export const logout = async(req,res)=>{
    try{
        const token = req.cookies.user_token 
        if(!token){
            return res.status(400).json(
                {
                    message:"User already logged out"
                }
            )
        }
        res.clearCookie("user_token",{
            httpOnly:true,
            samesite:"strict",
            secure:true
        })
        res.status(200).json({
            message:"user logged out successfully"
        })
    }
    catch(err){
        console.log(err)
    }
}