import express from "express"
import { Activity } from "../../../models/index.js"
import ActivitySerializer from "../../../serializers/ActivitySerializer.js"

const activityRouter = new express.Router()

activityRouter.get("/:id", async (req, res) => {
    const activityId = req.params.id
    try {
        const activity = await Activity.query().findById(activityId)
        const serializedActivity = await ActivitySerializer.getSummaryOfOne(activity)
        return res.status(200).json({ activity: serializedActivity })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

export default activityRouter
