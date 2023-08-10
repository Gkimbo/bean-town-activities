import express from "express"
import { Activity, Review, User, Rating } from "../../../models/index.js"
import { ValidationError } from "objection"
import cleanUserInput from "../../../services/cleanUserInput.js"

const activityReviewRouter = new express.Router({ mergeParams: true })

activityReviewRouter.post("/", async (req, res) => {
    const userId = req.user.id
    const newReview = cleanUserInput(req.body)
    const { content } = newReview

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

activityReviewRouter.get("/rating", async (req, res) => {
    try {
        const allRatings = await Rating.query()
        return res.status(200).json({allRatings})
    } catch (error) {
        return res.status(500).json({errors: error})
    }
})

activityReviewRouter.post("/rating", async (req, res) => {
    const { reviewId, rating } = req.body
    const userId = req.user.id
    try {
        const currentVote = await Rating.query().findOne({reviewId, userId})
        console.log(currentVote)
        if(!currentVote){
            const newRating = await Rating.query().insert({ reviewId, userId, rating })
            return res.status(201).json(newRating)
        }
        const response = {}
        return res.status(200).json({newRating: response})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

activityReviewRouter.get("/", async (req, res) => {
    const userId = req.user.id
    const activityId = req.params.id

    try {
        const activity = await Activity.query().findById(activityId)
        const allReviews = await activity.$relatedQuery("reviews").where("userId", userId)
        return res.status(200).json({ reviews: allReviews })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

activityReviewRouter.delete("/:id", async (req, res) => {
    try {
        const reviewToDelete = await Review.query().findById(req.params.id)
        if (reviewToDelete.userId === req.user.id) {
            await reviewToDelete.$query().delete()
        } else {
            const errorMessage = `You are not authorized to delete this review.`
            const error = new Error(errorMessage)
            throw error
        }

        return res.status(200).json({ review: reviewToDelete })
    } catch (err) {
        return res.status(500).json({ errors: err })
    }
})

export default activityReviewRouter
