const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required!"],
        minlength: [3, "Title must be atleast 3 characters"],
        maxlength: [100, "Title must be atmost 100 characters"]
    },
    description: {
        type: String,
        required: [true, "Description is required!"],
        minlength: [3, "Description must be atleast 3 characters"]
    },
    tag: [String],
    image: {
        type: String,
        default: null
    },
    isPrivate: {
        type:Boolean,
        default:true
    },
    createdBy: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Auth",
        required:[true, "id required!"]
    }
}, { timestamps: true });

const Note = mongoose.model("Note", noteSchema)

module.exports = Note