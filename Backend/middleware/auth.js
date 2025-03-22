const User = require('../modules/User');
const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) => {

    const token = req.cookies.token;
    if (!token) {
        return res.status(400).json({ message: "Token not found" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JET_KEY);
        console.log(decoded);
        req.user = await User.findById(decoded._id);
        next();
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "Token not verified", error: error.message });
    }
};

module.exports = isAuthenticated;