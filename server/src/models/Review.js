const Model = require("./Model")

class Review extends Model {
    static get tableName() {
        return "reviews"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["review"],
            properties: {
                review: { type: "string" }
            }
        }
    }

    static get relationMappings() {
        const { User, Activity } = require("./index.js")

        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "reviews.userId",
                    to: "users.id"
                }
            },

            activity: {
                relation: Model.BelongsToOneRelation,
                modelClass: Activity,
                join: {
                    from: "reviews.activityId",
                    to: "activities.id"
                }
            }
        }
    }
}

module.exports = Review
