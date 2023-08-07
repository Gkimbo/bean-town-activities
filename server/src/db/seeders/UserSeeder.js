import { User } from "../../models/index.js"

class UserSeeder {
    static async seed() {
        const userData = [
            {
                name: "John Doe",
                userName: "JohnnyBoy",
                email: "JohnnyBoy@gmail.com",
                password: "JohnnyBoy123"
            },
            {
                name: "Jane Doe",
                userName: "JaneTheMain",
                email: "JainDoe@gmail.com",
                password: "abc123"
            }
        ]

        for (const oneUser of userData) {
            const currentUser = await User.query().findOne({ name: oneUser.userName })
            if (!currentUser) {
                await User.query().insert(oneUser)
            }
        }
    }
}

export default UserSeeder
