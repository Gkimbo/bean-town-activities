import { Activity, Review, User } from "../../models/index.js"

class ReviewsSeeder {
    static async seed() {
        const john = await User.query().findOne({email: "JohnnyBoy@gmail.com"})
        const jane = await User.query().findOne({email: "JainDoe@gmail.com"})
        const jjf = await Activity.query().findOne({name: "J.J. Foley's"})
        const sideBar = await Activity.query().findOne({name: "Sidebar"})
        const theHub = await Activity.query().findOne({name: "The Hub Pub"})
        const alley = await Activity.query().findOne({name: "Alley Bar"})
        const reviewsData = [
            {
                content: "Great Bar and Grille fun Irish vibes!",
                userId: john.id,
                activityId: jjf.id
            },
            {
                content: "Fun spot, great bar!",
                userId: john.id,
                activityId: jjf.id
            },
            {
                content: "Great cocktails, better times",
                userId: john.id,
                activityId: sideBar.id
            },
            {
                content: "Love being outside, great service!",
                userId: john.id,
                activityId: theHub.id
            },
            {
                content: "Expensive drinks but great Karaoke",
                userId: jane.id,
                activityId: alley.id 
            },
            {
                content: "Not worth the wait",
                userId: jane.id,
                activityId: alley.id
            }
        ]

        for (const oneReview of reviewsData) {
            const currentReview = await Review.query().findOne({ content: oneReview.content })
            if (!currentReview) {
                await Review.query().insert(oneReview)
            }
        }
    }
}

export default ReviewsSeeder
