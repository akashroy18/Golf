import razorpay from "../utils/razorpay.js"
import crypto from "crypto"
import User from "../models/user.model.js"

export const createOrder = async (req, res) => {
    try {
        const { plan } = req.body

        const amount = plan === "monthly" ? 100 : 1000

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: "order_" + Date.now()
        }

        const order = await razorpay.orders.create(options)

        res.json({ order, amount, plan })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            plan
        } = req.body

        const body =
            razorpay_order_id + "|" + razorpay_payment_id

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex")

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ message: "Payment failed" })
        }

        const user = await User.findById(req.user.id)

        let expiryDate = new Date()

        if (plan === "monthly") {
            expiryDate.setDate(expiryDate.getDate() + 30)
        } else {
            expiryDate.setDate(expiryDate.getDate() + 365)
        }

        user.isSubscribed = true
        user.plan = plan
        user.subscriptionEndDate = expiryDate

        await user.save()

        res.json({ message: "Payment successful" })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}