const User = require('../models/User');
const Token = require('../models/Token')
const bcrypt = require('bcrypt');
const generateToken = require('../helpers/generateToken')
const dotenv = require('dotenv');

dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE;

exports.login = async(req, res) => {
    if (!(req.body.username && req.body.password)) {
        return res.status(400).json({success: false, message: "Please provide full username and password"});
    }
    try {
        const user = await User.findOne({username: req.body.username});
        if (!user) {
            return res.status(401).json({success: false, message: "Wrong username"});
        }
        const isPasswordMatched = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordMatched) {
            return res.status(401).json({success: false, message: "Wrong password"});
        }
        const userData = {
            _id: user._id,
            username: user.username,
            is_admin: user.is_admin
        }
        const accessToken = await generateToken(userData, accessTokenSecret, accessTokenLife)
        const refreshToken = await generateToken(userData, refreshTokenSecret, refreshTokenLife)
        const token = await Token.create({userid: user._id, access: accessToken, refresh: refreshToken})
        res.cookie("token", token);
        res.status(201).json({success: true, access: accessToken, refresh: refreshToken});
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
}

exports.logout = async(req, res) => {
    await Token.deleteOne({access: req.cookies.token.access})
    res.clearCookie("token");
    res.status(200).json({success: true, message: "Logout successfully"})
}

exports.signup = async(req, res) => {
    if (!(req.body.username && req.body.password)) {
        return res.status(400).json({success: false, message: "Please provide full username and password"});
    }
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = await User.create(req.body);
        res.status(200).json({success: true, message: "Signup successfully"});
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
}