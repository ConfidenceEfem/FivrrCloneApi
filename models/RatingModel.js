const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
    count: {
        type: Number,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel"
    },
    content:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "contents"
    },
},{
    timestamps: true
})

const RatingModel = mongoose.model("ratings", RatingSchema)

module.exports = RatingModel