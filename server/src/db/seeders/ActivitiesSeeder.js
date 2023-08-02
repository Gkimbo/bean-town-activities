import { Activity, Category } from "../../models/index.js";

class ActivitiesSeeder {
    static async seed() {
        const drinks = await Category.query().findOne({ name: "Drinks" });
        const food = await Category.query().findOne({ name: "Food" });
        const miniGolf = await Category.query().findOne({ name: "Mini-golf" });
        const shopping = await Category.query().findOne({ name: "Shopping" });
        await Activity.query().insert({ name: "J.J. Foley's", description: "Bar and Grille with Irish vibes!", categoryId: drinks.id });
        await Activity.query().insert({ name: "Sidebar", description: "Cheap drinks with an atmosphere that changes every night", categoryId: drinks.id });
        await Activity.query().insert({ name: "The Hub Pub", description: "Friendliest Pub in the Hub", categoryId: drinks.id });
        await Activity.query().insert({ name: "Alley Bar", description: "Expensive drinks but great Karaoke", categoryId: drinks.id });
        await Activity.query().insert({ name: "Roxanne's cocktail bar", description: "Great cocktails, better times", categoryId: drinks.id });
        await Activity.query().insert({ name: "Back Deck", description: "Burgers outside", categoryId: food.id });
        await Activity.query().insert({ name: "Gene's Chinese Flatbread Cafe", description: "Cheap Chinese food you cant live without", categoryId: food.id });
        await Activity.query().insert({ name: "Falafel King", description: "Falafel's not much more to say", categoryId: food.id });
        await Activity.query().insert({ name: "Roche Bros", description: "The one stop shop for food", categoryId: shopping.id });
        await Activity.query().insert({ name: "T.J.Maxx", description: "Cheap everything, from clothes to appliances", categoryId: shopping.id });
        await Activity.query().insert({ name: "The Corner Mall", description: "Its a mall, not much more to add", categoryId: shopping.id });
        await Activity.query().insert({ name: "GNC", description: "Steroids without the hassle", categoryId: shopping.id });
        await Activity.query().insert({ name: "Marshalls", description: "The same as T.J.Maxx but a different name", categoryId: shopping.id });
    }
}

export default ActivitiesSeeder;