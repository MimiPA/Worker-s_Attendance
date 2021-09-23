const attendanceModel = require('../model/attendanceModel');
const bcrypt = require('bcrypt');
const moment = require('moment');
const jwt = require('jsonwebtoken');

process.env.TOKEN_KEY = "glints";

const checkinHandler = async (req, res) => {
    try {
        const token = req.body.token || req.query.token || req.headers["x-access-token"];
        const { latitude, longitude } = req.body;
        const today = moment().format('YYYY-MM-DD HH:mm:ss');

        if (!token) {
            return res.status(403).send("A token is required for authentication");
        }
        else if (!(latitude && longitude)) {
            res.status(400).send({ status: "failed", message: "All input is required" });
        }
        else {
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);

            const user = await userModel.create({
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: encryptedPassword,
                createdAt: today,
            });
        }
    }
    catch (err) {
        console.log(err);
        res.json({ message: err });
    }
};

module.exports = {
    checkinHandler
};