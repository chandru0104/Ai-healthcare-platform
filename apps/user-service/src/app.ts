import express from "express"
import router from "./routes/userRoutes"
import  helmet from "helmet"
import morgan from "morgan"
export const app= express()


app.use(express.json())
app.use(helmet())
app.use(morgan("dev"))

app.use(router)

