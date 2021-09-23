const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');

const verifyToken = (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers["x-access-token"];

        if (!token) {
            return res.status(403).send("A token is required for authentication");
        }
        else {
            const user = userModel.findOne({
                where: {
                    token: token
                }
            });

            if (!user) {
                return res.status(404).send("Token not match");
            }
        }

        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
        console.log(decoded);
    }
    catch (err) {
        return res.status(401).send("Invalid Token " + err);
    }
    return next();
};

module.exports = verifyToken;