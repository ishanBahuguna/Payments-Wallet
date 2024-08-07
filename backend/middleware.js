const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken")

function authMiddleware(req , res , next) {
    const token = req.headers.authorization

    // Two parts of authorzation header : 1) Bearer , 2) token
    if(!token || !token.startsWith("Bearer ")) {
        return res.status(403).json({});
    }

    const jwtToken = token.split(" ")[1];

    try{
        const decodedValue = jwt.verify(jwtToken , JWT_SECRET);
        if(decodedValue.userId) {
            req.userId = decodedValue.userId;
            next();
        }else {
            return res.status(403).json({})
        }
    } catch(e) {
        return res.status(403).json({})
    }

}

module.exports = {
    authMiddleware
}