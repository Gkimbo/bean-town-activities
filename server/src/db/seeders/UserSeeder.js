import { User } from "../../models/index.js"

class UserSeeder {
    static async seed() {
        const userData = [
            {
                email: "JohnnyBoy@gmail.com",
                password: "JohnnyBoy123"
            },
            {
                email: "JainDoe@gmail.com",
                password: "abc123"
            }
        ]

        for (const oneUser of userData) {
            const currentUser = await User.query().findOne({ email: oneUser.email })

            if (!currentUser) {
                await User.query().insert(oneUser)
            }
        }
    }
}

export default UserSeeder
