import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
    _id: {
        type: String,
        unique: true,
    },
    cgpa: {
        type: Number,
        required: false,
    },
    skills: {
        type: Array,
        required: false,
    },
    resumeUrl: {
        type: String,
        required: false,
    },
    rollNumber: {
        type: String,
        required: false,
    },
})

const DBCandidate = mongoose.model("Candidate", candidateSchema);
export default DBCandidate 