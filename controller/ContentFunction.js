const express = require('express')
const contents = require("../models/ContentModel")
const users = require("../models/UserModel")

const postContents = async(req,res)=>{
  try {
    if(req.user.seller){
      const {title, desc,price, category} = req.body
    const getUser = await users.findById(req.params.id)
    const getContent = new contents({
      title,desc,price,category,image: req.file.path
    })
    getContent.user = getUser
    getContent.save()

    getUser.content.push(getContent)
    getUser.save()

    res.status(201).json({message: "Content created successfully", data: getContent})
    }else{
res.status(404).json({message: "You don't have right to perform this operation"})
    }
  } catch (error) {
    res.status(404).json({message: error.message})
  }
}

const populateUserContent = async (req,res)=>{
  try {
    const id = req.params.id
    const getUserPopulate = await users.findById(id).populate("content")
    res.status(201).json({message: "Populated", data:getUserPopulate })
  } catch (error) {
    res.status(404).json({message: error.message})
  }
}
const populateContentUser = async (req,res)=>{
  try {
    const id = req.params.id
    const getUserPopulate = await contents.findById(id).populate("user")
    res.status(201).json({message: "Populated", data:getUserPopulate })
  } catch (error) {
    res.status(404).json({message: error.message})
  }
}

const updateContent = async (req,res)=>{
if(req.user.seller){
  try{
    const contentid = req.params.contentid
    const {title, desc,price, category} = req.body
    const contentUpdate = await contents.findByIdAndUpdate(contentid,{title,desc,price,category,image:req.file.path}, {new:true})
   
    res.status(201).json({message: "content Update completed", data:contentUpdate})
      }catch(error){
        res.status(404).json({message: error.message})
      }
}else{
 
}
}

const DeleteContents = async (req,res)=>{
    try{
 if(req.user.seller){
   const userid = req.params.userid
   const getUser = await users.findById(userid)
   const contentDeleted = await contents.findByIdAndDelete(req.params.contentid)

   getUser.content.pull(contentDeleted)
   getUser.save()
   res.status(201).json({message: "Deleted successfully", data: contentDeleted})
    }
    else{
     res.status(404).json({message: "You don't have right for this operation"})
  }
  }catch(error){

    }
}

module.exports = {
  postContents,populateUserContent,populateContentUser,updateContent,DeleteContents
}