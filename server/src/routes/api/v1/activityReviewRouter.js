import express from "express"
import { Review } from "../../../models/index.js"
import { ValidationError } from "objection";
import cleanUserInput from "../../../services/cleanUserInput.js";

const activityReviewRouter = new express.Router({ mergeParams: true })

activityReviewRouter.post("/", async (req, res) => {
    const newReview = cleanUserInput(req.body)
    const { content } = newReview
    const userId = req.user.id
    const activityId = req.params.id

    try {
        const newReview = await Review.query().insertAndFetch({ content, activityId, userId })
        return res.status(201).json({ review: newReview })
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({ errors: error.data })
        }
        return res.status(500).json({ errors: error })
    }
})

export default activityReviewRouter
