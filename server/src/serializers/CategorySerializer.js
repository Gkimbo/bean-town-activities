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
}

export default CategorySerializer;