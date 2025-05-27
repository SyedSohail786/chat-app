const express = require("express")
const { jwtVerify } = require("../middlewares/jwtVerify")
const { signup, login, profileUpdate } = require("../controllers/authController")

const authRoutes = express.Router()

authRoutes.post("/auth/signup", signup)
authRoutes.post("/auth/login", login)
authRoutes.put("/profile-update", jwtVerify, profileUpdate)


module.exports = { authRoutes }