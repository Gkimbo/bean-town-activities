const Model = require("./Model.js");

class Activity extends Model {
    static get tableName() {
        return "activities";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["name"],
            properties: {
                name: { type: "string", minLength: 2 },
                description: { type: "string" },
            },
        };
    }

    static get relationMappings() {
        const { Category, Review, User } = require("./index.js");
        return {
            category: {
                relation: Model.BelongsToOneRelation,
                modelClass: Category,
                join: {
                    from: "activities.categoryId",
                    to: "categories.id",
                },
            },

            reviews: {
                relation: Model.HasManyRelation,
                modelClass: Review,
                join: {
                    from: "activities.id",
                    to: "reviews.activityId"
                }
            },

            users: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: "activities.id",
                    through: {
                        from: "reviews.activityId",
                        to: "reviews.userId"
                    },
                    to: "users.id"
                }
            }
        };
    }
}

module.exports = Activity;