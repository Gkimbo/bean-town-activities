import express from "express"
import { Activity, Review } from "../../../models/index.js"
import { ValidationError } from "objection";
import cleanUserInput from "../../../services/cleanUserInput.js";

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

reviewsRouter.post("/", async (req,res)=>{

    const newReview = cleanUserInput(req.body)
    const {review , userId} = newReview
    const {activityId} = req.params

    console.log("inside post",req.params, newReview)
    try{
        const newReview = await Review.query().insertAndFetch({review, activityId, userId})
        console.log(newReview)
        return res.status(201).json({review: newReview})
    }catch(error){
        if (error instanceof ValidationError){
            return res.status(422).json({errors:error.data})
        }
        return res.status(500).json({errors:error})
    }
})

export default reviewsRouter
