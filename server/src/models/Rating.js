const Model = require("./Model")

class Rating extends Model {
    static get tableName() {
        return "ratings"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["rating", "userId", "reviewId"],
            properties: {
                rating: { type: ["string", "integer"] },
                userId: { type: ["string", "integer"] },
                reviewId: { type: ["string", "integer"] }
            }
        }
    }

    static get relationMappings() {
        const { Review } = require("./index.js")

        return {
            review: {
                relation: Model.BelongsToOneRelation,
                modelClass: Review,
                join: {
                    from: "ratings.reviewId",
                    to: "reviews.id"
                }
            }
        }
    }
}

module.exports = Rating
