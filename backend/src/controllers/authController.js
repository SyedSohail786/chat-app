const { userModel } = require("../models/UserModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { cloudinary } = require("../utils/cloudinary");

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
               const token = jwt.sign({ email }, process.env.SECRET, {
                    expiresIn: "7d"
               })
               await saveRes.save()
               res.status(200).json({
                    _id: saveRes._id,
                    profilePic: saveRes.profilePic,
                    email: saveRes.email,
                    token
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
          if (!userData) return res.status(201).json({ code: 12, msg: "User Not Found" })
          const verifyPass = await bcrypt.compare(password, userData.password)
          if (!verifyPass) return res.status(201).json({ code: 13, msg: "Invalid Credentials" })

          const token = jwt.sign({ email }, process.env.SECRET, {
               expiresIn: "7d"
          })
          res.status(200).json({
               msg: "Succesfully Logged In",
               profilePic: userData.profilePic,
               userName: userData.userName,
               email: userData.email,
               token
          })


     } catch (error) {
          res.send({
               msg: error.message
          })
     }


};

const profileUpdate = async (req, res) => {
     const { profilePic } = req.body;

     const { _id } = req.userData

     try {
          if (!_id || !profilePic) return res.status(400).json({ msg: "fields are required" })
          if (!profilePic) return res.status(400).json({ msg: "Profile Pic Required", code: 51 })
          const uploadRes = await cloudinary.uploader.upload(profilePic)

          const updatedUser = await userModel.findByIdAndUpdate(_id, { profilePic: uploadRes.secure_url }, { new: true })

          res.status(200).json(updatedUser)
     } catch (error) {
          res.send({
               msg: error.message
          })
     }
}

module.exports = { signup, login, profileUpdate }