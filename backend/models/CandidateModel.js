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
    description: {
        type: String,
        required: false,
    },
    experience: {
        type: [{
            company: { type: String, required: true },
            role: { type: String, required: true },
            duration: { type: String, required: true },
        }],
        required: false,
    },
    projects: {
        type: [{
            name: { type: String, required: true },
            description: { type: String, required: true },
            link: { type: String, required: true },
        }],
        required: false,
    },
    portfolioUrl: {
        type: String,
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