import express from "express"
import { limit } from "../src/rateLimit/rate-limiter"
import {authMiddleware} from "../src/authMiddleware/auth"
import { createProxyMiddleware } from "http-proxy-middleware"

const app = express()

app.use(limit)

const authProxy= createProxyMiddleware({
      changeOrigin:true,
      target : process.env.AUTH_URL as string,
      pathRewrite:{
          "^/api/auth":" "
      }
})

const userProxy = createProxyMiddleware({
  changeOrigin:true,
  target : process.env.USER_URL as string,
  pathRewrite:{
    "^/api/user" : " "
  }
})

app.use("/",(req,res)=>{
  res.json({
    message:`API gateway runnig in ${process.env.PROT}`
  })
})

app.use("/api/auth",authProxy)
app.use("/api/user",authMiddleware,userProxy)


app.listen(process.env.PROT,()=>{
  console.log(`API gateway runnig in ${process.env.PROT}`)
})


