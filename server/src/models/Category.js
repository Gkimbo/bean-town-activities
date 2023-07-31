const Model = require("./Model.js");
const uniqueFactory = require("objection-unique");

const unique = uniqueFactory({
    field: ["name"],
});

class Category extends unique(Model) {
    static get tableName() {
        return "categories";
    }
}

module.exports = Category;
