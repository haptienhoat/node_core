const jwt = require('jsonwebtoken')
const Token = require('../models/Token')
const dotenv = require('dotenv')

dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

exports.verifyToken = async (req, res, next) => {
    const tokenClient = req.headers["token"] || req.body.token;
    try {
        const token = await Token.findOne({ access: tokenClient });
        if (tokenClient && token) {
            const decoded = jwt.verify(tokenClient, accessTokenSecret);
            req.user = decoded.userData;
            next();
        } else {
            res.status(401).json({success: false, message: 'Token not found'})
        }
    } catch (err) {
        res.status(403).json({success: false, message: err.message})
    }
}