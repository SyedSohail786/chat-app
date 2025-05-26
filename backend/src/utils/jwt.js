
const jwt = require("jsonwebtoken")

const jwtFunction=(email,res)=>{
     const token = jwt.sign({email},process.env.SECRET,{
          expiresIn:"7d"
     })

          res.cookie("chat-app-jwt", token,{
               maxAge:604800000,
               httpOnly: true,
               sameSite: "strict",
               secure: process.env.DEV

          })
          return token;
}



module.exports={jwtFunction}