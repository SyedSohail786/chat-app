const jwt = require("jsonwebtoken")


const jwtVerify = (req, res, next) => {
     try {
          const token = req.cookie.chat-app-jwt
          if (!token) return res.status(401).json({ msg: "Unauthorized - Token not provided" })
          const verifyJwt = jwt.verify(token, process.env.SECRET)
          if (!verifyJwt) return res.status(401).json({ msg: "Unauthorized - Invalid Token" })

          const userData = jwt.verify(token,process.env.SECRET)
          res.user = userData
          console.log(userData)
          next()
     } catch (error) {

     }

}

module.exports={jwtVerify}