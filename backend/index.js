const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser");
const { mongoose } = require("mongoose");
const { authRoutes } = require("./src/routes/authRoutes");
const { messageRoutes } = require("./src/routes/messageRoutes");
require("dotenv").config()
const fileUpload =  require("express-fileupload");

const app = express()
app.use(cookieParser());
app.use(express.json())
// app.use(cors({
//   origin: "http://localhost:3000", // Replace with your frontend URL
//   credentials: true
// }));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/", // or any folder for temporary storage
}));

app.use(cors());

app.use(authRoutes)
app.use(messageRoutes)

mongoose.connect(process.env.MONGO_LOCAL + "ChatApp")
     .then(() => console.log("MONGO-DB ATLAS CONNECTED"))
app.listen(process.env.PORT, () => {
     console.log("SERVER STARTED ON PORT:", process.env.PORT)
})
