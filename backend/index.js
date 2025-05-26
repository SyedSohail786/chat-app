const express = require("express")
const cors = require("cors")
const { mongoose } = require("mongoose")
const { AllRoutes } = require("./src/routes/AllRoutes")
const app = express()
require("dotenv").config()

app.use(express.json())
app.use(cors())
app.use(AllRoutes)


mongoose.connect(process.env.MONGO_LOCAL+"ChatApp")
     .then(()=>console.log("MONGO-DB ATLAS CONNECTED"))
app.listen(process.env.PORT,()=>{
     console.log("SERVER STARTED ON PORT:", process.env.PORT)
})
