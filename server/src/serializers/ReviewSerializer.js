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
}

export default ReviewSerializer
