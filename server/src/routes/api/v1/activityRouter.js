import express from "express"
import { Activity } from "../../../models/index.js"
import ActivitySerializer from "../../../serializers/ActivitySerializer.js"
import activityReviewRouter from "./activityReviewRouter.js"

const activityRouter = new express.Router()

activityRouter.use("/:id/reviews", activityReviewRouter)

activityRouter.get("/:id", async (req, res) => {
    const activityId = req.params.id
    const { user } = req.session.passport
    try {
        console.log(user)
        const activity = await Activity.query().findById(activityId)
        const serializedActivity = await ActivitySerializer.getSummaryOfOne(activity)
        const fullActivity = {...serializedActivity, user}
        return res.status(200).json({ activity: fullActivity })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

export default activityRouter
