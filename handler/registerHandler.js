const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const moment = require('moment');
const jwt = require('jsonwebtoken');

process.env.TOKEN_KEY = "glints";

const registerHandler = async (req, res) => {
    try {
        const { email, full_name, password, repassword } = req.body;
        const today = moment().format('YYYY-MM-DD HH:mm:ss');

        if (!email) {
            res.status(400).send({ status: "failed", message: "Email is required" });
        }
        else if (!full_name) {
            res.status(400).send({ status: "failed", message: "Full Name is required" });
        }
        else if (!password) {
            res.status(400).send({ status: "failed", message: "Password is required" });
        }
        else if (!repassword) {
            res.status(400).send({ status: "failed", message: "Repassword is required" });
        }
        else if (password != repassword) {
            res.status(400).send({ status: "failed", message: "Please match both password" });
        }
        else {
            const oldUser = await userModel.findOne({
                where: {
                    email: email
                }
            });

            if (oldUser) {
                return res.status(409).send({ status: 'failed', message: 'User Already Exist. Please Login' });
            }

            encryptedPassword = await bcrypt.hash(password, 10);

            const user = await userModel.create({
                full_name: full_name,
                email: email,
                password: encryptedPassword,
                createdAt: today,
            });

            const level = await userModel.findOne({
                where: {
                    email: email
                }
            });

            const id_level = level.id_level;

            const token = jwt.sign(
                { id_register: user.id_register, id_level, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "1h",
                }
            );

            const upUser = await userModel.update(
                { token: token },
                { where: { email: user.email } }
            );

            res.status(201).send({
                status: 'success',
                token: token,
                message: 'Register Account Successful'
            });
        }
    }
    catch (err) {
        console.log(err);
        res.json({ message: err });
    }
};

module.exports = {
    registerHandler
};