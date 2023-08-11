import RatingSerializer from "./RatingsSerializer.js"

class ReviewSerializer {
    static async getSummaryOfArray(reviews, user) {
        const acceptedAttributes = ["id", "content", "userId", "activityId"]
        const serializedActivity = await Promise.all(
            reviews.map(async (review) => {
                const finalReview = {}
                let upVote = 0
                let downVote = 0
                for (const attribute of acceptedAttributes) {
                    finalReview[attribute] = review[attribute]
                }
                const votes = await review.$relatedQuery("ratings")
                const serializedVotes = RatingSerializer.getSummaryOfArray(votes)
                serializedVotes.forEach((voteObject) => {
                    if (voteObject.rating == 2) {
                        upVote++
                    }
                    if (voteObject.rating == 1) {
                        downVote++
                    }

                    if (voteObject.userId === user.id) {
                        finalReview.voted = true
                    } else {
                        finalReview.voted = false
                    }
                })
                finalReview.upVote = upVote
                finalReview.downVote = downVote
                finalReview.totalRating = upVote - downVote
                return finalReview
            })
        )
        return serializedActivity
    }

    static async getSummaryOfOne(review, user){
        const acceptedAttributes = ["id", "content", "userId", "activityId"]

        const serializedReview = {}
        for(const attribute of acceptedAttributes){
            serializedReview[attribute] = review[attribute]
        }

        let upVote = 0
        let downVote = 0
        let voted = false
        const votes = await review.$relatedQuery("ratings")
        const serializedVotes = RatingSerializer.getSummaryOfArray(votes)
        serializedVotes.forEach((voteObject) => {
            if (voteObject.rating == 2) {
                upVote++
            }
            if (voteObject.rating == 1) {
                downVote++
            }
            if (voteObject.userId === user.id) {
                voted = true
            }
        })
        serializedReview.upVote = upVote
        serializedReview.downVote = downVote
        serializedReview.totalRating = upVote - downVote
        serializedReview.voted = voted
        return serializedReview
    }
}

export default ReviewSerializer
