import User from "../models/user.model.js"

export const activateSubscription = async (req, res) => {
    try {
        const { plan } = req.body

        // Validate plan
        if (!["monthly", "yearly"].includes(plan)) {
            return res.status(400).json({
                message: "Invalid plan selected"
            })
        }

        const user = await User.findById(req.user.id)

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        // Check if already subscribed and still active
        if (
            user.isSubscribed &&
            user.subscriptionEndDate &&
            user.subscriptionEndDate > new Date()
        ) {
            return res.status(400).json({
                message: "You already have an active subscription"
            })
        }

        // Calculate expiry
        let expiryDate = new Date()

        if (plan === "monthly") {
            expiryDate.setDate(expiryDate.getDate() + 30)
        } else {
            expiryDate.setDate(expiryDate.getDate() + 365)
        }

        // Update subscription
        user.isSubscribed = true
        user.plan = plan
        user.subscriptionEndDate = expiryDate

        await user.save()

        res.status(200).json({
            message: "Subscription activated successfully",
            subscription: {
                plan: user.plan,
                expiresAt: user.subscriptionEndDate
            }
        })

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}