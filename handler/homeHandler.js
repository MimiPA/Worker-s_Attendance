const attendanceModel = require('../model/attendanceModel');
const userModel = require('../model/userModel');
const moment = require('moment');
const momentTZ = require('moment-timezone');
const jwt = require('jsonwebtoken');

const homeHandler = async (req, res) => {
    try {
        const token = req.body.token || req.query.token || req.headers["x-access-token"];

        if (!token) {
            return res.status(403).send("A token is required for authentication");
        }
        else {
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);

            const user = await userModel.findOne({
                where: {
                    email: decoded.email
                }
            });

            if (!user) {
                return res.status(400).send({ status: 'failed', message: 'User account doesn\'t exist' });
            }
            else {
                return res.status(200).send({ status: 'success', message: 'Welcome to home page', email: user.email, full_name: user.full_name });
            }
        }
    }
    catch (err) {
        console.log(err);
        return res.json({ message: err });
    }
};

module.exports = {
    homeHandler
};