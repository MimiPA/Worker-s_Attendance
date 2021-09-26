const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const sendEmail = require('./sendEmail');

process.env.TOKEN_KEY = "glints";

const forgotHandler = async (req, res) => {
    try {
        const { email } = req.body;
        if (email == undefined) {
            res.status(400).send({ status: 'failed', message: 'Email address is missing' });
        }
        else {
            const pengguna = await userModel.findOne({
                where: {
                    email: email
                }
            });
            if (!pengguna) return res.status(400).send({ status: 'failed', message: 'Email user doesn\'t exist' });

            const subject = "Reset Account Password"
            const text = `Please klik this link to reset your password
                        http://localhost:5000/users/reset/${pengguna.id_register}
        
                        Thank You`;

            await sendEmail(pengguna.email, subject, text);

            if (!sendEmail) {
                res.status(400).send({ status: 'failed', message: 'Reset link cannot be sent' });
            }
            else {
                res.status(201).send({ status: 'success', message: "Link password reset sent to your email account" });
            }
        }
    }
    catch (err) {
        console.log(err);
        res.json({ message: err });
    }
};

module.exports = {
    forgotHandler
};