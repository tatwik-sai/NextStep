import DBUser from "../models/UsersModel.js";


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