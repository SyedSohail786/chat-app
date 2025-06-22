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

io.on("connection", (socket) => {
     console.log("Client connected", socket.id)

     socket.on("disconnect", () => {
          console.log("Client disconnected", socket.id)
     })
})

module.exports = { server, io, app }