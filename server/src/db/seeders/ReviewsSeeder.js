import { Review } from "../../models/index.js"

class ReviewsSeeder {
    static async seed() {
        const reviewsData = [
            {
                review: "Great Bar and Grille fun Irish vibes!",
                userId: 1,
                activityId: 1
            },
            {
                review: "Fun spot, great bar!",
                userId: 1,
                activityId: 1
            },
            {
                review: "Great cocktails, better times",
                userId: 1,
                activityId: 2
            },
            {
                review: "Love being outside, great service!",
                userId: 1,
                activityId: 3
            },
            {
                review: "Expensive drinks but great Karaoke",
                userId: 2,
                activityId: 4
            },
            {
                review: "Not worth the wait",
                userId: 2,
                activityId: 4
            }
        ]

        for (const oneReview of reviewsData) {
            const currentReview = await Review.query().findOne({ review: oneReview.review })
            if (!currentReview) {
                await Review.query().insert(oneReview)
            }
        }
    }
}

export default ReviewsSeeder
