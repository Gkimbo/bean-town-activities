const Model = require("./Model.js");
const uniqueFactory = require("objection-unique");

const unique = uniqueFactory({
    fields: ["name"],
});

class Category extends unique(Model) {
    static get tableName() {
        return "categories";
    }
}

module.exports = Category;
