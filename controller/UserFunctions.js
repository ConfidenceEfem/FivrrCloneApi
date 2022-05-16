const express = require('express')
const path = require("path")
const multer = require("multer")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const user = require("../models/UserModel")

const getAllCreatedUsers = async (req,res)=>{
    try{
        const getAllUsers = await user.find()
        res.status(201).json({message: "All Users", data:getAllUsers })
    }catch(error){
        res.status(400).json({message: error.message})
    }
}
const getOneCreatedUsers = async (req,res)=>{
    try{
        const id = req.params.id
        const getAllUsers = await user.findById(id)
        res.status(201).json({message: "One User", data:getAllUsers })
    }catch(error){
        res.status(400).json({message: error.message})
    }
}


module.exports = {
getAllCreatedUsers,
getOneCreatedUsers
}