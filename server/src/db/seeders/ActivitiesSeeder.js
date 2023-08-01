import { Activity, Category } from "../../models/index.js";

class ActivitiesSeeder {
    static async seed() {
        const drinks = await Category.query().findOne({ name: "Drinks" });
        const food = await Category.query().findOne({ name: "Food" });
        const miniGolf = await Category.query().findOne({ name: "Mini-golf" });
        const shopping = await Category.query().findOne({ name: "Shopping" });
        await Activity.query()
        .insert({ name: "Seeder Bar", description: "The description of the seeder bar", categoryId: drinks.id });
        await Activity.query()
        .insert({ name: "Seeder Restaurant", description: "The description of the seeder restaurant", categoryId: food.id });
        await Activity.query()
        .insert({ name: "Seeder Mini-golf", description: "The description of the seeder mini-golf", categoryId: miniGolf.id });
        await Activity.query()
        .insert({ name: "Seeder Store", description: "The description of the seeder store", categoryId: shopping.id });
    }
}

export default ActivitiesSeeder;