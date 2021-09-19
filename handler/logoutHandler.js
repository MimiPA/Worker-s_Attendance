const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const moment = require('moment');
const jwt = require('jsonwebtoken');

process.env.TOKEN_KEY = "glints";

const logoutHandler = async (req, res) => {
    try {
        const tokenHeader = req.body.token || req.query.token || req.headers["x-access-token"];
        const tokenBaru = jwt.sign(
            { tokenHeader },
            process.env.TOKEN_KEY,
            {
                expiresIn: "1s",
            }
        );
        const upUser = userModel.update(
            { token: tokenBaru },
            { where: { token: tokenHeader } }
        );
        res.send({ status: 'success', message: 'You have been Logged Out' + decoded });
    }
    catch (err) {
        return res.status(401).send("Invalid Token Logout");
    }
}

module.exports = {
    logoutHandler
};