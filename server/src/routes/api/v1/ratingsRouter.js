import express from "express"
import { Rating, Review } from "../../../models/index.js" 
import RatingSerializer from "../../../serializers/RatingsSerializer.js"
import ReviewSerializer from "../../../serializers/ReviewSerializer.js"

const ratingsRouter = new express.Router()

ratingsRouter.post("/", async (req, res) => {
    const { reviewId, rating } = req.body
    const userId = req.user.id
    try {
        const newRating = await Rating.query().insert({ reviewId, userId, rating })
        const review = await Review.query().findById(reviewId)
        const serializedReview = await ReviewSerializer.getSummaryOfOne(review, req.user)
        return res.status(201).json({review: serializedReview })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})


export default ratingsRouter