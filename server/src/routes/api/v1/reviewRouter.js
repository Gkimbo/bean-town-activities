import express from "express"
import { Review } from "../../../models/index.js"

const reviewsRouter = new express.Router({ mergeParams: true })



export default reviewsRouter
