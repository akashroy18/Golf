import Winner from "../models/winner.model.js"
import User from "../models/user.model.js"
import Charity from "../models/charity.model.js"

export const updateWinnerStatus = async (req, res) => {
    try {
        const { winnerId, status } = req.body

        const winner = await Winner.findById(winnerId)

        if (!winner) {
            return res.status(404).json({ message: "Winner not found" })
        }

        if (status === "paid" && winner.status !== "paid") {
            const totalPrize = winner.prizeAmount

            const charityAmount = totalPrize * 0.1
            const netAmount = totalPrize * 0.9

            winner.status = "paid"
            winner.charityAmount = charityAmount
            winner.netAmount = netAmount

            await winner.save()

            const user = await User.findById(winner.userId)

            if (user) {
                user.winnings.total += netAmount
                await user.save()

                if (user.selectedCharity) {
                    const charity = await Charity.findById(user.selectedCharity)

                    if (charity) {
                        charity.totalDonations += charityAmount
                        await charity.save()
                    }
                }
            }

            return res.json({
                message: "Payment processed",
                winner
            })
        }

        winner.status = status
        await winner.save()

        res.json(winner)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


export const getMyWinnings = async (req, res) => {
  try {
    const winners = await Winner.find({
      userId: req.user._id,
      status: "paid" // only count paid winnings
    }).populate("drawId");

    const totalWins = winners.length;

    const totalAmount = winners.reduce(
      (sum, w) => sum + (w.netAmount || 0),
      0
    );

    res.json({
      totalWins,
      totalAmount,
      wins: winners
    });

  } catch (err) {
    res.status(500).json({ message: "Error fetching winnings" });
  }
};