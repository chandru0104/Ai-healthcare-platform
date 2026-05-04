import { Router } from "express";
import {userServices} from "../controller/userController" 

const router = Router()

router.post("/api/user",userServices)


export default router