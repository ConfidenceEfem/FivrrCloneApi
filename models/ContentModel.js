const mongoose = require("mongoose")

const ContentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    rating:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ratings"
    }],
    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments"
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel"
    },
    category: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

const ContentModel = mongoose.model("contents",ContentSchema)

module.exports = ContentModel