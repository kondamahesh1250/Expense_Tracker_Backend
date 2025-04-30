require('dotenv').config();
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    // console.log(token);
    if (!token) {
        return res.status(401).send({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(403).send({ message: "Invalid token", error: error.message });
    }
};

module.exports=authMiddleware;