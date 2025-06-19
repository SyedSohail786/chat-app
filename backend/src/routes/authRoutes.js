const express = require("express")
const { jwtVerify } = require("../middlewares/jwtVerify")
const { signup, login, profileUpdate, signupOTP, forgotPassword, forgotPasswordOtpCheck } = require("../controllers/authController")

const authRoutes = express.Router()

authRoutes.post("/auth/signup", signup)
authRoutes.post("/auth/signup-otp", signupOTP)
authRoutes.post("/auth/login", login)
authRoutes.put("/profile-update", jwtVerify, profileUpdate)
authRoutes.post("/auth/forgotPassword", forgotPassword)
authRoutes.post("/auth/forgotPasswordOtpCheck",forgotPasswordOtpCheck)

module.exports = { authRoutes }