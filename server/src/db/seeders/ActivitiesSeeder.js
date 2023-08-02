import { Activity, Category } from "../../models/index.js"

class ActivitiesSeeder {
    static async seed() {
        const drinks = await Category.query().findOne({ name: "Drinks" })
        const food = await Category.query().findOne({ name: "Food" })
        const shopping = await Category.query().findOne({ name: "Shopping" })

        const activityData = [
            {
                name: "J.J. Foley's",
                description: "Bar and Grille with Irish vibes!",
                location: "21 Kingston St, Boston, MA 02111",
                categoryId: drinks.id
            },
            {
                name: "Sidebar",
                description: "Cheap drinks with an atmosphere that changes every night",
                location: "14 Bromfield St, Boston, MA 02108",
                categoryId: drinks.id
            },
            {
                name: "The Hub Pub",
                description: "Friendliest Pub in the Hub",
                location: "18 Province St, Boston, MA 02108",
                categoryId: drinks.id
            },
            {
                name: "Alley Bar",
                description: "Expensive drinks but great Karaoke",
                categoryId: drinks.id
            },
            {
                name: "Roxanne's cocktail bar",
                description: "Great cocktails, better times",
                categoryId: drinks.id
            },
            { name: "Back Deck", description: "Burgers outside", categoryId: food.id },
            {
                name: "Gene's Chinese Flatbread Cafe",
                description: "Cheap Chinese food you cant live without",
                categoryId: food.id
            },
            {
                name: "Falafel King",
                description: "Falafel's not much more to say",
                categoryId: food.id
            },
            {
                name: "Roche Bros",
                description: "The one stop shop for food",
                categoryId: shopping.id
            },
            {
                name: "T.J.Maxx",
                description: "Cheap everything, from clothes to appliances",
                categoryId: shopping.id
            },
            {
                name: "The Corner Mall",
                description: "Its a mall, not much more to add",
                categoryId: shopping.id
            },
            { 
                name: "GNC", 
                description: "Steroids without the hassle", 
                categoryId: shopping.id 
            },
            {
                name: "Marshalls",
                description: "The same as T.J.Maxx but a different name",
                categoryId: shopping.id
            }
        ]

        for(const activity of activityData){
            const currentActivity = await Activity.query().findOne({name: activity.name})
            if(!currentActivity){
                await Activity.query().insert(activity)
            }
        }
    }
}

export default ActivitiesSeeder
