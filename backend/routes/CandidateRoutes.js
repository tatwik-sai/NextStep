import { Router } from "express";
import {modifyCandidate, uplodFile, getCandidateData} from "../controllers/CandidateController.js"
import multer from "multer";
import fs from "fs";

const candidateRoutes = Router()
if (!fs.existsSync("./uploads")) {
    fs.mkdirSync("./uploads", { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage }); 


candidateRoutes.put("/:userId", modifyCandidate);
candidateRoutes.post("/:userId/upload_resume", upload.single("resume"), uplodFile);
candidateRoutes.get("/:userId", getCandidateData);


export default candidateRoutes;