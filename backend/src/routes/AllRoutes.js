const express =require("express")
const { signup, login, logout, profileUpdate } = require("../controllers/AllControler")
const { jwtVerify } = require("../middlewares/jwtVerify")

const AllRoutes= express.Router()



AllRoutes.post("/auth/signup", signup)
AllRoutes.post("/auth/login",login)
AllRoutes.post("/auth/logout",logout)
AllRoutes.put("/profileUpdate",jwtVerify,profileUpdate)


module.exports={AllRoutes}