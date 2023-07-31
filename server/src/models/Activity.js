const Model = require("./Model.js");

class Activity extends Model {
    static get tableName() {
        return "activities";
    }
}

module.exports = Activity;
