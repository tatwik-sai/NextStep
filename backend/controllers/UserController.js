import DBUser from "../models/UsersModel.js";
import DBCandidate from "../models/CandidateModel.js";


export const getUserData = async (req, res) => {
  try {
    const { userId } = req.params;
    const userData = await DBUser.findById(userId);

    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await DBUser.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({ error: "Failed to fetch all users" });
  }
}


export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, previousRole } = req.body;

    console.log("Update data received:", req.body);
    // if previous role is candidate and new role is changed to some other role, then delete the candidate profile
    // else if previous role is some other role and new role is candidate, then create a candidate profile
    if (previousRole === "candidate" && role !== "candidate") {
      // delete candidate profile
      await DBCandidate.findByIdAndDelete(id);
      console.log("Deleted candidate profile for user:", id);
    } else if (previousRole !== "candidate" && role === "candidate") {
      // create candidate profile
      const newCandidate = new DBCandidate({ _id: id });
      await newCandidate.save();
      console.log("Created candidate profile for user:", id);
    }


    const updatedUser = await DBUser.findByIdAndUpdate(id, { role }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log("Updated user:", updatedUser);
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ error: "Failed to update user" });
  }
}