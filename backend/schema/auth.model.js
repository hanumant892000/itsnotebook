const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Name is required!"],
        minlength: [2, "Name must be atleast 2 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: [true, "Email already exist!"],
        lowercase: true,
        match: [/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/, "Invalid email!"]
    },
    password: {
        type: String,
        required: [true, "Email is required!"],
        minlength: [8, "Password must be atleast 8 characters!"]
    },
    phone: {
        type:String,
        match: [/[+][9][1]-[6-9]\d{9}/, "Invalid phone number!"]
    },
    accountType: {
        type:String,
        enum:["user", "admin"],
        default:"user"
    },
    age: {
        type:Number,
        default:null
    },
    gender: {
        type:String,
        enum:["male", "female", "other", ""],
        default:""
    },
    address: {
        type:String,
        default:null
    },
    city: {
        type:String,
        default:null
    },
    state: {
        type:String,
        default:null
    },
    country: {
        type:String,
        default:null
    },
    pincode: {
        type:String,
        default:null
    },
    avatar: {
        type:String,
        default:null
    }


}, { timestamps: true });

const Auth = mongoose.model("Auth", authSchema)

module.exports = Auth