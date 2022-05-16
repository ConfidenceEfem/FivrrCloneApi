const express= require("express")
const mongoose = require("mongoose")
const app = express()
const router = require("./router/router")

app.use(express.json())

const url = "mongodb://localhost/Fiverrset05"
mongoose.connect(url).then(()=>{
    console.log("Connected to DB", url)
})

app.get("/", (req,res)=>{
    res.send("Welcome to Fiverr")
})

app.use("/", router)

app.listen(2024, ()=>{
    console.log("Listening to port", 2024)
})