const jwt = require("jsonwebtoken");
const config = require("config");

const auth = (req, res, next) => {
    //get token from header
    const token = req.header("x-auth-token");
    if (!token) {
        return res
            .status(401)
            .json({ msg: "No token provided, unauthorised." });
    }
    //verify token
    try {
        const decodePayload = jwt.verify(token, config.get("jwtSecret"));
        //return verified user
        req.user = decodePayload.user;
        next();
    } catch (e) {
        console.error(e);
        res.status(401).json({ msg: "Invalid token,unauthorised" });
    }
};

module.exports = auth;
