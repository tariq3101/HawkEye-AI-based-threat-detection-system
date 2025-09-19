const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    // Try to get token from cookie OR Authorization header
    const token = req.cookies.token || req.headers["authorization"]?.split(" ")[1];
    console.log("Received token:", token);

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token verified:", decoded);
        req.admin = decoded;
        next();
    } catch (err) {
        console.error("JWT error:", err);
        return res.status(401).json({ message: "Token is not valid" });
    }
};

module.exports = verifyToken;
