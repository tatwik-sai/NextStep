import { Router } from "express";
import { addPosting, getAllPostings } from "../controllers/InternshipController.js";

const internshipRoutes = Router();

internshipRoutes.post("/addPosting", addPosting);
internshipRoutes.get("/allPostings", getAllPostings);

export default internshipRoutes;