import User from "../models/user.model.js"

export const evaluateWinners = async (drawNumbers, drawId) => {
    const users = await User.find()

    let winners = []

    for (const user of users) {
        const userNumbers = user.scores.map(s => s.value)

        const matchCount = userNumbers.filter(num =>
            drawNumbers.includes(num)
        ).length

        if (matchCount >= 1) {
            winners.push({
                userId: user._id,
                name: user.name,
                email: user.email,
                drawId,
                matchCount
            })
        }
    }

    return winners
}