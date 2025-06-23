const express = require("express")
const http = require("http")
const { Server } = require("socket.io")
require("dotenv").config()

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
     cors: {
          origin: [process.env.FRONTEND_PATH],
     },
})

const userMap = {};

const getRecieverSocketId = (userId) => {
     return userMap[userId]
}

io.on("connection", (socket) => {

     console.log("Client connected ", socket.id)

     const userId = socket.handshake.query.userId;
     if (userId) userMap[userId] = socket.id;
     console.log(userMap)

     io.emit("getOnlineUsers", Object.keys(userMap));

     socket.on("disconnect", () => {
          console.log("Client disconnected", socket.id)
          console.log(userMap)
          delete userMap[userId];
          
          io.emit("getOnlineUsers", Object.keys(userMap));
     })
})

module.exports = { server, io, app, getRecieverSocketId }