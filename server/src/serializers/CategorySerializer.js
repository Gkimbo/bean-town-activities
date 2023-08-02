import ActivitySerializer from "./ActivitySerializer.js";

class CategorySerializer {
    static getSummary(category) {
        const allowedAttributes = ["id", "name"];
        const updatedCategories = category.map((category) => {
            return allowedAttributes.reduce((obj, attr) => {
                obj[attr] = category[attr];
                return obj;
            }, {});
        });
        return updatedCategories;
    }

    static async getSummaryOfOne(category) {
        const allowedAttributes = ["id", "name"];
        const updatedCategory = allowedAttributes.reduce((obj, attr) => {
            obj[attr] = category[attr];
            return obj;
        }, {});

        const activities = await category.$relatedQuery("activities");
        const serializedActivity = ActivitySerializer.getSummaryOfArray(activities)
        updatedCategory.activities = serializedActivity

        return updatedCategory;
    }
}

export default CategorySerializer;