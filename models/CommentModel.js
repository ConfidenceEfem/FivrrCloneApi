const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    msg: {
        type: String,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "userModel"
    },
    content: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "contents"
    }]
}, {
    timestamps: true
})

const CommentModel = mongoose.model("comments", CommentSchema)

module.exports = CommentModel