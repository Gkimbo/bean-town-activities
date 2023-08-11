class RatingSerializer {
    static getSummaryOfArray(array){
        const allowedAttributes = ["id", "rating", "userId", "reviewId"]

        const serializedRating = array.map((ratingObject) => {
            const newRatings = {}
            for(const attribute of allowedAttributes){
                newRatings[attribute] = ratingObject[attribute]
            }
            return newRatings
        })
        return serializedRating
    }

    static getSummaryOfOne(rating){
        const allowedAttributes = ["id", "rating", "userId", "reviewId"]
        const serializedRating = {}
        for(const attribute of allowedAttributes){
            serializedRating[attribute] = rating[attribute]
        }
        return serializedRating
    }
}

export default RatingSerializer