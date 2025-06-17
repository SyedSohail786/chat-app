const { userModel } = require("../models/UserModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { cloudinary } = require("../utils/cloudinary");
const { transporter } = require("../utils/nodemailer");
const { otpModel } = require("../models/OtpModel");
require("dotenv").config()

const signup = async (req, res) => {
     const { userName, email, password, profilePic, otp } = req.body;
     console.log(req.body)
     const saltRounds = 10;
     try {


          const findOTP = await otpModel.findOne({ email })
          if (!findOTP) return res.status(201).json({ code: 76, message: "No OTP Found" })
          if( otp != findOTP.otp) return res.status(201).json({ code: 77, message: "Invalid OTP" })

          if (findOTP.otp == otp) {
               const hash = await bcrypt.hash(password, saltRounds)
               const userData = { userName, password: hash, email, profilePic }
               const saveRes = new userModel(userData)
               const deleteOTP = await otpModel.deleteOne({ email })
               if (saveRes) {
                    const token = jwt.sign({ email }, process.env.SECRET, {
                         expiresIn: "7d"
                    })
                    await saveRes.save()

                    const info = await transporter.sendMail({
                              from: '"HeyChat" <kusohail70@gmail.com>',
                              to: `${email}`,
                              subject: "Welcome to HeyChat!",
                              text: "Your HeyChat account has been created successfully.",
                              html: `
                              <!DOCTYPE html>
                              <html>
                                   <head>
                                   <meta charset="UTF-8" />
                                   <title>Welcome to HeyChat</title>
                                   <style>
                                        body {
                                        font-family: Arial, sans-serif;
                                        background-color: #f9fafb;
                                        margin: 0;
                                        padding: 0;
                                        }
                                        .container {
                                        max-width: 600px;
                                        margin: 30px auto;
                                        background-color: #ffffff;
                                        border-radius: 10px;
                                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
                                        padding: 30px;
                                        text-align: center;
                                        }
                                        .header {
                                        background-color: #2563eb;
                                        padding: 20px;
                                        border-radius: 8px 8px 0 0;
                                        color: white;
                                        }
                                        .content {
                                        padding: 20px;
                                        }
                                        .footer {
                                        margin-top: 30px;
                                        font-size: 12px;
                                        color: #888888;
                                        }
                                        .cta-button {
                                        margin-top: 20px;
                                        display: inline-block;
                                        background-color: #2563eb;
                                        color: #ffffff;
                                        padding: 12px 24px;
                                        border-radius: 6px;
                                        text-decoration: none;
                                        font-weight: bold;
                                        }
                                   </style>
                                   </head>
                                   <body>
                                   <div class="container">
                                        <div class="header">
                                        <h1>🎉 Welcome to HeyChat!</h1>
                                        </div>
                                        <div class="content">
                                        <p>Hello ${userName},</p>
                                        <p>We’re excited to have you onboard. Your account has been successfully created.</p>
                                        <p>Now you can start chatting, making friends, and sharing moments!</p>
                                        <a href=${process.env.WEBSITE_LIVE_PATH} class="cta-button">Start Chatting</a>
                                        </div>
                                        <div class="footer">
                                        &copy; 2025 HeyChat. All rights reserved.
                                        </div>
                                   </div>
                                   </body>
                              </html>
                              `
                              });

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

const signupOTP = async (req, res) => {

     try {
          const { email, userName } = req.body;
          const user = await userModel.findOne({ email });
          if (user) return res.status(201).json({ code: 12, msg: "User Already Exists" })
          const otp = Math.floor(100000 + Math.random() * 900000);
          const deleteUserOTP = await otpModel.findOneAndDelete({ email })
          const saveOTP = await otpModel.create({ email, otp })
          const info = await transporter.sendMail({
               from: '"HeyChat" <kusohail70@gmail.com>',
               to: `${email}`,
               subject: "Account Creation",
               text: "Account Creation",
               html: `
                    <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Your OTP Code</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f3f4f6;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 30px auto;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
        padding: 30px;
      }
      .otp-box {
        font-size: 28px;
        font-weight: bold;
        color: #2563eb;
        background-color: #e0e7ff;
        padding: 15px;
        text-align: center;
        border-radius: 8px;
        letter-spacing: 4px;
        margin: 30px 0;
      }
      .footer {
        text-align: center;
        margin-top: 30px;
        font-size: 12px;
        color: #888888;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <h2 style="color: #1e40af;">Your Verification Code</h2>
      <p>Hello ${userName},</p>
      <p>
        Use the following One-Time Password (OTP) to verify create your account. This code is valid for the next 10 minutes:
      </p>

      <div class="otp-box">${otp}</div>

      <p>
        If you did not request this code, please ignore this email or contact support.
      </p>

      <p>Thanks,<br />HeyChat</p>

      <div class="footer">
        &copy; 2025 HeyChat. All rights reserved.
      </div>
    </div>
  </body>
</html>

          `,
          });
          res.status(200).json({
               code: 200,
               message: "OTP sent successfully",
          })
     } catch (error) {
          res.send({
               msg: error.message
          })

     }



}

module.exports = { signup, login, profileUpdate, signupOTP }