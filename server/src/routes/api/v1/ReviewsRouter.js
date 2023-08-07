import express from "express"
import { Activity } from "../../../models/index.js"

const reviewsRouter = new express.Router({ mergeParams: true })

reviewsRouter.get("/", async (req, res) => {
    try {
        const activityId = req.params.activityId
        const activity = await Activity.query().findById(activityId)

        const reviews = await activity.$relatedQuery("reviews")
        return res.status(200).json({ reviews })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

export default reviewsRouter
