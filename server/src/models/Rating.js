const Model = require("./Model")

class Rating extends Model{
    static get tableName(){
        return "ratings"
    }
}

module.exports = Rating