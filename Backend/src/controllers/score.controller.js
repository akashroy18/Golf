import User from '../models/user.model.js'
export const addScore = async (req,res)=>{
    try {
        const {value} = req.body
        if(!value||value<1||value>45){
            return res.status(400).json(
                {
                    message:"Score should be in limit (1-45)"
                }
            )
        }
        const user = await User.findById(req.user.id)
        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }
         if (
            !user.isSubscribed ||
            !user.subscriptionEndDate ||
            user.subscriptionEndDate < new Date()
        ) {
            return res.status(403).json({
                message: "Active subscription required to add score"
            })
        }
        user.scores.unshift({
            value,
            date:new Date()
        })
        if(user.scores.length>5){
            user.scores.pop()
        }
        await user.save()

        res.status(200).json({
            message: "Score added successfully",
            scores: user.scores
        })

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}
export const getScores = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("scores")

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        res.status(200).json({
            scores: user.scores
        })

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}