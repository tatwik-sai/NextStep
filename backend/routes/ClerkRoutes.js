import { Router } from "express";
import { raw } from "express";
import { onUserChange } from "../controllers/ClerkController.js";

const clerkRoutes = Router()

clerkRoutes.post("/userChange", raw({ type: 'application/json' }), onUserChange)

export default clerkRoutes;