import mongoose from "mongoose"

const drawSchema = new mongoose.Schema({
    numbers: {
        type: [Number],
        required: true
    },
    drawDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

export default mongoose.model("Draw", drawSchema)