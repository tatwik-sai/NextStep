import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: [true,"User ID is required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true,"Email is required"],
        unique: true,
    },
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    imageUrl: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        default: "unassigned",
        enum: ["unassigned", "candidate", "employer", "admin", "committee", "mentor"]
    }
})

const DBUser = mongoose.model("Users", userSchema);
export default DBUser