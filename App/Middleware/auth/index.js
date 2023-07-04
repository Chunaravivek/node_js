const jwt = require("jsonwebtoken");

exports.authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader;
    
    if (token != null && token != "undefined") {
        jwt.verify(token, process.env.JWT_KEY, async (err, user) => {
            if (err) return res.status(403).json('Invalid Token');
        });
    } else {
        return res.status(403).json('Invalid Token');
    }
    next();
}