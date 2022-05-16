const express = require('express')
const path = require("path")
const multer = require("multer")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const user = require("../models/UserModel")


const CreateNewUserAsBuyer = async (req,res) =>{
    try{
            const {name, email,password} = req.body

            const saltP = await bcrypt.genSalt(10)
            const hashP = await bcrypt.hash(password,saltP)
            const UserCreated = await user.create({name,email,password:hashP,avatar: req.file.path})
            res.status(201).json({message: "Users created Successfully", data:UserCreated})
    }catch(err){
        res.status(400).json({message: err.message})
    }
}
const CreateNewUserAsSeller = async (req,res) =>{
    try{
            const {name, email,password} = req.body

            const saltP = await bcrypt.genSalt(10)
            const hashP = await bcrypt.hash(password,saltP)
            const UserCreated = await user.create({name,email,password:hashP,avatar: req.file.path,seller: true})
            res.status(201).json({message: "Users created Successfully", data:UserCreated})
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

const SignInUser = async (req,res)=>{
    try{
        const {email, password} = req.body
        const findUser = await user.findOne({email})
        if(findUser){
            const compareP = await bcrypt.compare(password,findUser.password)
            if(compareP){
                const {password, ...data} = findUser._doc
                const token = jwt.sign({...data},"FIvErrClOneWIthMrPetEr", {expiresIn: "1d"})
                res.status(201).json({message: "User created Successfully", data:{...data,token}})
               
            }else{
                res.status(400).json({message: "Incorrect Password"})
            }
        }else{
            res.status(400).json({message: "User doesn't exist"})
        }
    }catch(error){
         res.status(400).json({message: error.message})
    }
}



module.exports = {
    CreateNewUserAsBuyer,
    CreateNewUserAsSeller,
    SignInUser
}