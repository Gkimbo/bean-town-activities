const Model = require("./Model")

class Review extends Model {
    static get tableName() {
        return "reviews"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["content"],
            properties: {
                content: { type: "string" }
            }
        }
    }

    get votedStatus(){
        let voted
        if (this.userId === user.id) {
            voted = true
        } else {
            voted = false
        } 
        return voted
    }

    static get relationMappings() {
        const { User, Activity, Rating } = require("./index.js")

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
            },
            ratings: {
                relation: Model.HasManyRelation,
                modelClass: Rating,
                join: {
                    from: "reviews.id",
                    to: "ratings.reviewId"
                }
            }
        }
    }
}

module.exports = Review
