const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');

const verifyToken = async (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers["x-access-token"];

        if (!token) {
            return res.status(403).send({ status: 'failed', message: 'A token is required for authentication' });
        }
        else {
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);
            req.user = decoded;
            console.log(decoded);

            const user = await userModel.findOne({
                where: {
                    id_register: decoded.id_register
                }
            });

            if (!user) {
                return res.status(404).send({ status: 'failed', message: 'Token not match' });
            }
            else if(user.token == 0) {
                return res.status(404).send({ status: 'failed', message: 'Please Login' });
            }
            else if(user.token != token) {
                return res.status(404).send({ status: 'failed', message: 'Invalid token' });
            }
        }
    }
    catch (err) {
        return res.status(401).send("Invalid Token " + err);
    }
    return next();
};

module.exports = verifyToken;