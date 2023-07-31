const Model = require("./Model.js");
const uniqueFactory = require("objection-unique");

const unique = uniqueFactory({
    fields: ["name"],
});

class Category extends unique(Model) {
    static get tableName() {
        return "categories";
    }
    static get relationMappings() {
        const { Activity } = require("./index.js");

        return {
            activities: {
                relation: Model.HasManyRelation,
                modelClass: Activity,
                join: {
                    from: "categories.id",
                    to: "activities.categoryId",
                },
            },
        };
    }
}

module.exports = Category;
