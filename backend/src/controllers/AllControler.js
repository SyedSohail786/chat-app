const { userModel } = require("../models/UserModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");



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
          if (!userData) return res.status(400).json({ code: 12, msg: "User Not Found" })
          const verifyPass = await bcrypt.compare(password, userData.password)
          if (!verifyPass) return res.status(400).json({ code: 12, msg: "Invalid Credentials" })

          const token = jwt.sign({email},process.env.SECRET,{
          expiresIn:"7d"
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
     console.log(req.userData)
     const { email } = req.userData

     try {
          await userModel.findOneAndUpdate({ email }, { $set: { profilePic } })
          res.status(200).json({
               msg: "Profile Pic Updated"
          })
     } catch (error) {
          res.send({
               msg: error.message
          })
     }
}

module.exports = { signup, login, profileUpdate }