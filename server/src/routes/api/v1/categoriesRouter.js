import express from "express"
import { Category } from "../../../models/index.js"
import CategorySerializer from "../../../serializers/CategorySerializer.js"

const categoriesRouter = new express.Router()

categoriesRouter.get("/", async (req, res) => {
    try {
        const categories = await Category.query()
        const serializedCategories = await CategorySerializer.getSummary(categories)
        return res.status(200).json({ categories: serializedCategories })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

categoriesRouter.get("/:id", async (req, res) => {
    try {
        const category = await Category.query().findById(req.params.id)
        const serializedCategory = await CategorySerializer.getSummaryOfOne(category)
        return res.status(200).json({ category: serializedCategory })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

export default categoriesRouter
