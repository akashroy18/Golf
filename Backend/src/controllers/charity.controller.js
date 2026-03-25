import Charity from "../models/charity.model.js"
import User from "../models/user.model.js"

export const getCharities = async (req, res) => {
    const charities = await Charity.find()
    res.json(charities)
}

export const selectCharity = async (req, res) => {
    const { charityId } = req.body

    const user = await User.findById(req.user.id)

    user.selectedCharity = charityId
    await user.save()

    res.json({ message: "Charity selected", user })
}