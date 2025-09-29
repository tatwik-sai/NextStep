import { Router } from "express";
import {getUserData, getAllUsers, updateUser} from "../controllers/UserController.js"

const userRoutes = Router()

userRoutes.get("/:userId", getUserData)
userRoutes.get("/", getAllUsers);
userRoutes.put("/:id", updateUser);

export default userRoutes;