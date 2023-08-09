const Model = require("./Model.js")

class Activity extends Model {
    static get tableName() {
        return "activities"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["name"],
            properties: {
                name: { type: "string", minLength: 2 },
                description: { type: "string" },
                location: { type: "string" }
            }
        }
    }

    static get relationMappings() {
        const { Category, Review} = require("./index.js")
        return {
            category: {
                relation: Model.BelongsToOneRelation,
                modelClass: Category,
                join: {
                    from: "activities.categoryId",
                    to: "categories.id"
                }
            },
            reviews: {
                relation: Model.HasManyRelation,
                modelClass: Review,
                join: {
                    from: "activities.id",
                    to: "reviews.activityId"
                }
            }
        }
    }
}

module.exports = Activity
