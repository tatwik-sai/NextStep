import DBCandidate from "../models/CandidateModel.js";

export const modifyCandidate = async (req, res) => {
    const { userId } = req.params;
    const updates = req.body;

    try {
        const candidate = await DBCandidate.findByIdAndUpdate(userId, updates, { new: true });
        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }
        return res.json(candidate);
    } catch (error) {
        console.error("Error updating candidate:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getCandidateData = async (req, res) => {
    const { userId } = req.params;
    try {
        const candidate = await DBCandidate.findById(userId);
        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }
        return res.json(candidate);
    } catch (error) {
        console.error("Error fetching candidate:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const uplodFile = async (req, res) => {
    const { userId } = req.params;
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    try {
        const candidate = await DBCandidate.findByIdAndUpdate(userId, { resumeUrl: req.file.filename }, { new: true });
        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }
        return res.status(200).json(candidate);
    } catch (error) {
        console.error("Error uploading file:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
