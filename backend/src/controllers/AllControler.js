const { userModel } = require("../models/UserModel");
const bcrypt = require('bcrypt');
const { jwtFunction } = require("../utils/jwt");



const signup = async (req, res) => {
     const { userName, email, password, profilePic } = req.body;
     const saltRounds = 10;
     try {
          const userExist = await userModel.findOne({ email })
          if (password.length < 8) return res.status(400).json({ code: 10, msg: "Password Length Must Be Minimum 8 Character" })
          if (!userName || !email || !password) return res.status(400).json({ code: 11, msg: "All Field Are Required" })
          if (userExist) return res.status(400).json({ code: 12, msg: "User Already Exist" })
          const hash = await bcrypt.hash(password, saltRounds)
          const userData = { userName, password: hash, email, profilePic }
          const saveRes = new userModel(userData)


          if (saveRes) {
               jwtFunction(email, res)
               await saveRes.save()
               res.status(200).json({
                    _id: saveRes._id,
                    profilePic: saveRes.profilePic,
                    email: saveRes.email
               })

          } else {
               res.send({
                    code: 13,
                    msg: "Invalid USer"
               })
          }



     } catch (error) {
          res.send({
               msg: error.message
          })
     }



};

const login = async (req, res) => {
     const { email, password } = req.body;

     try {
          const userData = await userModel.findOne({ email })
          if (!userData) return res.status(400).json({ code: 12, msg: "User Not Found" })
          const verifyPass = await bcrypt.compare(password, userData.password)
          if (!verifyPass) return res.status(400).json({ code: 12, msg: "Invalid Credentials" })

          jwtFunction(email, res)
          res.status(200).json({
               msg: "Succesfully Logged In",
               profilePic: userData.profilePic,
               userName: userData.userName,
               email: userData.email
          })


     } catch (error) {
          res.send({
               msg: error.message
          })
     }


};

const logout = async (req, res) => {
     try {
          res.clearCookie("chat-app-jwt", {
               httpOnly: true,
               sameSite: "strict",
               secure: process.env.DEV
          });

          res.status(200).json({
               success: true,
               msg: "Successfully logged out"
          });
     } catch (error) {
          res.status(500).json({
               success: false,
               msg: "Logout failed",
               error: error.message
          });
     }
};

const profileUpdate = async (req, res) => {
     const { profilePic } = req.body;
     const { email } = req.user

     try {
          await userModel.findOneAndUpdate({ email }, { $set: { profilePic: profilePic } })
          res.status(200).json({
               msg: "Profile Pic Updated"
          })
     } catch (error) {
          res.send({
               msg: error.message
          })
     }
}

module.exports = { signup, login, logout, profileUpdate }