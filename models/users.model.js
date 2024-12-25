import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "This username Already exists"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    // forgotPasswordToken: String,
    // forgotPasswordTokenExpiry: Date,
    // verifyToken: String,
    // verifyTokenExpiry: Date

} , {timestamps: true});


export const User = mongoose.models.User ||  mongoose.model("User", userSchema);

export default User;