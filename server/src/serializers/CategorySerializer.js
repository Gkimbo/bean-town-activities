class CategorySerializer {
    static async getSummary(category) {
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
        updatedCategory.activities = activities.map((activity) => {
            return {
                id: activity.id,
                name: activity.name,
                description: activity.description,
            };
        });
        return updatedCategory;
    }
}

export default CategorySerializer;