import express from "express"
import router from "./routes/userRoutes"
export const app= express()


app.use(express.json())


app.use(router)

