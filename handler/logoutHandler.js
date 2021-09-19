const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const moment = require('moment');
const jwt = require('jsonwebtoken');

process.env.TOKEN_KEY = "glints";

const logoutHandler = async (req, res) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    try {
        if (!token) {
            res.status(401).send("No Token Logout");
        }
        else {
            let tokenBaru = jwt.sign("expired", "glints",
                {
                    expiresIn: "1h",
                }
            );
            const upUser = userModel.update(
                { token: tokenBaru },
                { where: { token: token } }
            );
            res.send({ status: 'success', message: 'You have been Logged Out' + decoded });
        }
    }
    catch (err) {
        return res.status(401).send("Invalid Token Logout " + err);
    }
}

module.exports = {
    logoutHandler
};