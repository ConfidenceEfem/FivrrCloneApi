const express = require('express');
const rates = require("../models/RatingModel")
const users = require("../models/UserModel")
const contents = require("../models/ContentModel")

const rateContents = async (req,res)=>{
    try{
        const contentData = await contents.findById(req.params.contentid)
        const rateItems = new rates({
            count: req.body.count
        })

        rateItems.content = contentData
        rateItems.save()

        contentData.rating.push(rateItems)
        contentData.save()
        res.status(201).json({message: "Rated successfully", data: rateItems})
    }catch(error){
        res.status(404).json({message: error.message})
    }
}

module.exports = {
rateContents
}