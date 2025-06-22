const express = require("express")
const http = require("http")
const { Server } = require("socket.io")

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
     cors: {
          origin: ['http://localhost:5173'],
     },
})

const userMap = {};
io.on("connection", (socket) => {
     console.log("Client connected", socket.id)
     
     const userId = socket.handshake.query.userId;
     if(userId) userMap[userId] = socket.id;

     io.emit("getOnlineUsers", Object.keys(userMap));
     
     socket.on("disconnect", () => {
          console.log("Client disconnected", socket.id)
     })
})

module.exports = { server, io, app }