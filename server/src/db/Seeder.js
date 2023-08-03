/* eslint-disable no-console */
import { connection } from "../boot.js";
import CategorySeeder from "./seeders/CategoriesSeeder.js";
import ActivitySeeder from "./seeders/ActivitiesSeeder.js";
import ReviewsSeeder from "./seeders/ReviewsSeeder.js";


class Seeder {
    static async seed() {
        // include individual seed commands here

        console.log("seeding Categories");
        await CategorySeeder.seed();

        console.log("seeding Activities");
        await ActivitySeeder.seed();

        console.log("Seeding Reviews")
        await ReviewsSeeder.seed();

        console.log("Done!");
        await connection.destroy();
    }
}

export default Seeder;
