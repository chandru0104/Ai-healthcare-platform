import {app} from "./app"
import {connectDB} from "./db/db"


connectDB()

app.listen(process.env.PORT, ()=>{
    console.log("api connect in 5002")
})