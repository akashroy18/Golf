import Draw from "../models/draw.model.js"
import Winner from "../models/winner.model.js"
import { generateRandomNumbers } from "../utils/generateNumbers.js"
import { evaluateWinners } from "../services/draw.service.js"
import { calculatePrize } from "../services/prize.service.js"
import User from "../models/user.model.js"

export const runDraw = async (req, res) => {
    try {
        const numbers = generateRandomNumbers()

        const draw = await Draw.create({ numbers })

        const activeUsers = await User.countDocuments({
            isSubscribed: true,
            subscriptionEndDate: { $gt: new Date() }
        })

        const prizePool = activeUsers * 100 * 0.5

        let winners = await evaluateWinners(numbers, draw._id)

        winners = calculatePrize(winners, prizePool)

        await Winner.insertMany(winners)

        // ✅ THIS IS THE FIX
        const populatedWinners = await Winner.find({
            drawId: draw._id
        }).populate({
            path: "userId",
            select: "name email"
        })

        res.json({
            draw,
            winners: populatedWinners
        })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}