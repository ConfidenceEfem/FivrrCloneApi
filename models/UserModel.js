const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
    },
    password: {
        type: String, 
        required:true,
        minlength: 3,

    },
    avatar: {
        type: String,
    },
    seller:{
        type: Boolean,
        default: false,
    },
    content: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "contents"
    }]
},{
    timestamps: true
})

const UserModel = mongoose.model("userModel", UserSchema) 

module.exports = UserModel