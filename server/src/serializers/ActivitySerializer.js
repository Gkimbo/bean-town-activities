import ReviewSerializer from "./ReviewSerializer.js"
class ActivitySerializer {
    static async getSummaryOfOne(activity, user) {
        const acceptedAttributes = ["id", "name", "description", "location"]
        const serializedActivity = {}
        for (const attribute of acceptedAttributes) {
            serializedActivity[attribute] = activity[attribute]
        }
        const reviews = await activity.$relatedQuery("reviews")
        const serializedReviews = await ReviewSerializer.getSummaryOfArray(reviews, user)
        serializedActivity.reviews = serializedReviews
        return serializedActivity
    }

    static getSummaryOfArray(activityArray) {
        const acceptedAttributes = ["id", "name", "description", "location"]
        const serializedActivity = activityArray.map((activity) => {
            const serializedObject = {}
            for (const attribute of acceptedAttributes) {
                serializedObject[attribute] = activity[attribute]
            }
            return serializedObject
        })
        return serializedActivity
    }
}

export default ActivitySerializer
