class ReviewSerializer {
    static getSummaryOfArray(reviews) {
        const acceptedAttributes = ["id", "content", "userId", "activityId"]
        const serializedActivity = reviews.map((review) => {
            const finalReview = {}
            for (const attribute of acceptedAttributes) {
                finalReview[attribute] = review[attribute]
            }
            return finalReview
        })
        return serializedActivity
    }
}

export default ReviewSerializer
