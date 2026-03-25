import mongoose from "mongoose"

const winnerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    drawId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Draw"
    },
    name: String,
    email: String,
    matchCount: Number,
    prizeAmount: Number,
    status: {
        type: String,
        enum: ["pending", "paid"],
        default: "pending"
    },
    proof: String,
    charityAmount: {
        type: Number,
        default: 0
    },
    netAmount: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

export default mongoose.model("Winner", winnerSchema)