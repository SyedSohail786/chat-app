const { msgModel } = require("../models/MsgModel")
const { userModel } = require("../models/UserModel")
const { cloudinary } = require("../utils/cloudinary");



const getAllUsers = async (req, res) => {
     const senderId = req.userData._id
     try {
          if (!senderId) return res.status(400).json({ msg: "No Sender ID Found" })
          const allUsers = await userModel.find({ _id: { $ne: senderId } }).select("-password")
          console.log(allUsers)
          res.status(200).json({ msg: "Fetched Success", users: allUsers })

     } catch (error) {
          console.log("error in getAllUsers Controller")
          res.send({
               msg: error.message
          })
     }

}

const chatWith = async (req, res) => {
     try {
          const myId = req.userData._id;
          const receiverId = req.params.id;
          console.log(receiverId, myId)
          const messages = await msgModel.find({
               $or: [
                    { senderId: myId, receiverId: receiverId },
                    { senderId: receiverId, receiverId: myId }
               ]
          })
          if (!messages.length > 0) return res.send({ code: 46, msg: "No Messages Found" })

          res.status(200).json(messages)
     } catch (error) {
          console.log("Error in ChatWith Controller")
          res.send({
               msg: error.message
          })
     }
}

const sendMsg = async (req, res) => {
     try {
          const { image, text } = req.body;
          const receiverId = req.params.id;
          const myId = req.userData._id;
          let imageUrl;
          if (image) {
               const imageUpload = await cloudinary.uploader.upload(image)
               imageUrl = imageUpload.secure_url
          }
          const newMessage = new msgModel({
               senderId: myId,
               receiverId,
               text, image: imageUrl
          })

          await newMessage.save()
          res.status(200).json(newMessage)
     } catch (error) {
          console.log("Error in sendMsg Controller")
          res.send({
               msg: error.message
          })
     }
}

module.exports = { getAllUsers, chatWith, sendMsg }