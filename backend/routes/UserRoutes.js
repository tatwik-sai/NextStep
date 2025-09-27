import { Router } from "express";
import {getUserData} from "../controllers/UserController.js"

const userRoutes = Router()

userRoutes.get("/:userId", getUserData)

export default userRoutes;