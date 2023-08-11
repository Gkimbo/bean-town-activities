import express from "express"
import { Activity } from "../../../models/index.js"
import ActivitySerializer from "../../../serializers/ActivitySerializer.js"
import activityReviewRouter from "./activityReviewRouter.js"

const activityRouter = new express.Router()

activityRouter.use("/:id/reviews", activityReviewRouter)

activityRouter.get("/:id", async (req, res) => {
    const activityId = req.params.id
    try {
        const activity = await Activity.query().findById(activityId)
        const serializedActivity = await ActivitySerializer.getSummaryOfOne(activity, req.user)
        return res.status(200).json({ activity: serializedActivity })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

export default activityRouter
