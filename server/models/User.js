import { Schema, model } from "mongoose";

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    bankName: {
        type: String,
        required: true,
        enum: ["state-bank", "kotak-bank", "maharashtra-bank", "hdfc-bank", "axis-bank", "badoda-bank", "other"]
    },
    contactNumber: {
        type: Number,
        required: true
    },
    address: {
        type: String,
    }
},{timestamps:true})

const User = model("User", userSchema);
export default User;

