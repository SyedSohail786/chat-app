const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser");
const { AllRoutes } = require("./src/routes/AllRoutes")
const { mongoose } = require("mongoose")
require("dotenv").config()

const app = express()
app.use(cookieParser());
app.use(express.json())
// app.use(cors({
//   origin: "http://localhost:3000", // Replace with your frontend URL
//   credentials: true
// }));


app.use(cors({
  origin: true,            // allows all origins dynamically
  credentials: true        // allow sending cookies
}));


app.use(AllRoutes)

mongoose.connect(process.env.MONGO_LOCAL+"ChatApp")
     .then(()=>console.log("MONGO-DB ATLAS CONNECTED"))
app.listen(process.env.PORT,()=>{
     console.log("SERVER STARTED ON PORT:", process.env.PORT)
})
