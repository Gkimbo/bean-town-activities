import express from "express"
import { Review } from "../../../models/index.js"

const reviewsRouter = new express.Router({mergeParams: true})

reviewsRouter.delete("/:id", async (req, res) => {
    try{
        const review = await Review.query().findById(req.params.id)
        
        await review.$query().delete()
        return res.status(200).json({review})
    }catch(err){
        return res.status(500).json({errors:err})
    }
})

export default reviewsRouter