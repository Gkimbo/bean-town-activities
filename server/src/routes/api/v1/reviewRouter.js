import express from "express"
import { Review } from "../../../models/index.js"
import { ValidationError } from "objection";
import cleanUserInput from "../../../services/cleanUserInput.js";

const reviewRouter = new express.Router({ mergeParams: true })

reviewRouter.post("/", async (req,res)=>{
    const newReview = cleanUserInput(req.body)
    const {content , userId} = newReview
    const activityId = req.params.id
    try{
        const newReview = await Review.query().insertAndFetch({content, activityId , userId})
        console.log(newReview)
        return res.status(201).json({review: newReview})
    }catch(error){
        if (error instanceof ValidationError){
            return res.status(422).json({errors:error.data})
        }
        return res.status(500).json({errors:error})
    }
})

export default reviewRouter
