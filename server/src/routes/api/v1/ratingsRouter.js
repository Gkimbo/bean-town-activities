import express from "express"
import { Rating } from "../../../models/index.js" 
import RatingSerializer from "../../../serializers/RatingsSerializer.js"

const ratingsRouter = new express.Router()

ratingsRouter.post("/", async (req, res) => {
    const { reviewId, rating } = req.body
    const userId = req.user.id
    try {
        const currentVote = await Rating.query().findOne({ reviewId, userId })
        if (!currentVote) {
            const newRating = await Rating.query().insert({ reviewId, userId, rating })
            const serializedRating = RatingSerializer.getSummaryOfOne(newRating)
            const allRatings = await Rating.query()
            const serializedRatingsArray = RatingSerializer.getSummaryOfArray(allRatings)
            return res.status(201).json({ allRatings: serializedRatingsArray, newRating:serializedRating })
        }
        const response = { error: "You have already voted on this review!" }
        return res.status(200).json({ newRating: response })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})


export default ratingsRouter