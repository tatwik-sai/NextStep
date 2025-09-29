import DBInternship from "../models/InternshipModel.js";

export const addPosting = async (req, res) => {
    try {
        const { _id, title, company, desc, location, duration, stipend, required_skills, company_mail } = req.body;
        const newPosting = new DBInternship({
            _id: _id,
            title,
            company,
            desc,
            location,
            duration,
            stipend,
            required_skills,
            company_mail
        });
        await newPosting.save();
        res.status(201).json({ message: "Internship posting added successfully", posting: newPosting });
    } catch (error) {
        console.error("Error adding internship posting:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllPostings = async (req, res) => {
    try {
        const postings = await DBInternship.find();
        res.status(200).json(postings);
    }
    catch (error) {
        console.error("Error fetching internship postings:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}