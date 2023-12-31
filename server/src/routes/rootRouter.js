import express from "express"

import categoriesRouter from "./api/v1/categoriesRouter.js"
import userSessionsRouter from "./api/v1/userSessionsRouter.js"
import usersRouter from "./api/v1/usersRouter.js"
import clientRouter from "./clientRouter.js"
import activityRouter from "./api/v1/activityRouter.js"
import ratingsRouter from "./api/v1/ratingsRouter.js"

const rootRouter = new express.Router()
rootRouter.use("/", clientRouter)
rootRouter.use("/api/v1/user-sessions", userSessionsRouter)
rootRouter.use("/api/v1/users", usersRouter)


rootRouter.use("/api/v1/activities", activityRouter)
rootRouter.use("/api/v1/categories", categoriesRouter)
rootRouter.use("/api/v1/ratings", ratingsRouter)

export default rootRouter
