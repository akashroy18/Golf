import User from "../models/user.model.js"
import Winner from "../models/winner.model.js"
import Charity from "../models/charity.model.js"

export const getDashboardStats = async (req, res) => {
    const totalUsers = await User.countDocuments()
    const totalPrize = await Winner.aggregate([
        { $group: { _id: null, total: { $sum: "$prizeAmount" } } }
    ])

    const charityTotal = await Charity.aggregate([
        { $group: { _id: null, total: { $sum: "$totalDonations" } } }
    ])

    res.json({
        totalUsers,
        totalPrize: totalPrize[0]?.total || 0,
        charityTotal: charityTotal[0]?.total || 0
    })
}