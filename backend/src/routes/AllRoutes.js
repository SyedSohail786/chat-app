const express =require("express")
const { signup, login, profileUpdate } = require("../controllers/AllControler")
const { jwtVerify } = require("../middlewares/jwtVerify")

const AllRoutes= express.Router()



AllRoutes.post("/auth/signup", signup)
AllRoutes.post("/auth/login",login)
AllRoutes.put("/profileUpdate",jwtVerify,profileUpdate)


module.exports={AllRoutes}