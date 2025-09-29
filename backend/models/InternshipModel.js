import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: [true,"User ID is required"],
        unique: true,
    },
    title: {
        type: String,
        required: false,
    },
    company: {
        type: String,
        required: false,
    },
    desc: {
        type: String,
        required: false,
    },
    location: {
        type: String,
        required: false,
    },
    duration: {
        type: String,
    },
    stipend: {
        type: String,
    },
    postedDate: {
        type: Date,
        default: Date.now,
        required: true, 
    },
    required_skills: {
        type: [String],
        required: false,
        default: []
    },
    company_mail: {
        type: String,
        required: false,
    },
})

const DBInternship = mongoose.model("Internships", internshipSchema);
export default DBInternship