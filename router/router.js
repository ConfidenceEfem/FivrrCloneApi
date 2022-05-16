const express = require('express');
const router = express.Router()
const multer = require("multer")
const path = require('path')
const jwt = require("jsonwebtoken")
const {CreateNewUserAsBuyer,CreateNewUserAsSeller,SignInUser} = require('../controller/Registrations')
const {getAllCreatedUsers,getOneCreatedUsers} = require("../controller/UserFunctions")
const {postContents,populateUserContent,populateContentUser, updateContent,DeleteContents} = require("../controller/ContentFunction")
const {rateContents} = require("../controller/RatingFunction")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
      );
    },
  });

  const upload = multer({storage: storage}).single("avatar")
  const uploadContent = multer({storage: storage}).single("image")


  const verification = (req,res,next)=>{
      try{
            const authToken = req.headers.authorization
            if(authToken){
                const token = authToken.split(" ")[1]
                if(token){
                    jwt.verify(token, "FIvErrClOneWIthMrPetEr", (error,payload)=>{
                        if(error){
                            res.status(400).json({message: "Please check your token again"})
                        }else{
                            req.user = payload
                            next()
                        }
                    })
                }else{
                    res.status(400).json({message: "Please check your token"})
                }
            }else{
                res.status(400).json({message: "You don't have right for this operation"})
            }
      }catch(error){
          res.status(400).json({message: error.message})
      }
  }

router.post("/registerBuyer", upload, CreateNewUserAsBuyer)
router.post("/registerSeller", upload, CreateNewUserAsSeller)
router.post("/signin", SignInUser)
router.get("/allUsers", getAllCreatedUsers)
router.get("/user/:id", getOneCreatedUsers)
router.post("/content/:id", verification,uploadContent, postContents)
router.get("/content/:id", populateUserContent)
router.get("/content/user/:id", populateContentUser)
router.patch("/content/:contentid",verification,uploadContent, updateContent)
router.delete("/:userid/content/:contentid",verification, DeleteContents)
router.post("/:contentid/rate", verification,rateContents)


module.exports = router