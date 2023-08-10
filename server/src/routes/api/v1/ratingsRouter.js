import express from "express"
import { Rating } from "../../../models/index.js" 
import RatingSerializer from "../../../serializers/RatingsSerializer.js"

const ratingsRouter = new express.Router()

ratingsRouter.post("/", async (req, res) => {
    const { reviewId, rating } = req.body
    const userId = req.user.id
    try {
        const newRating = await Rating.query().insert({ reviewId, userId, rating })
        const serializedRating = RatingSerializer.getSummaryOfOne(newRating)
        return res.status(201).json({newRating:serializedRating })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})


export default ratingsRouter