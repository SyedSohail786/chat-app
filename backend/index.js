const express = require("express")
const cors = require("cors")
const { AllRoutes } = require("./src/AllRoutes")
const app = express()
require("dotenv").config()

app.use(express.json())
app.use(cors())
app.use(AllRoutes)

app.listen(process.env.PORT,()=>{
     console.log("SERVER STARTED ON PORT:", process.env.PORT)
})