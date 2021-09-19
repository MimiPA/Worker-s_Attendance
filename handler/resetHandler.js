const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const sendEmail = require('./sendEmail');

process.env.TOKEN_KEY = "glints";

const resetPassHandler = async (req, res) => {
    try {
        const { id_register } = req.params;
        const { password } = req.body;

        if (!id_register) {
            res.status(400).send('ID Register is missing');
        }
        else if(!password){
            res.status(400).send('Password is missing');
        }
        else {
            const pengguna = userModel.findOne({
                where: {
                    id_register: id_register
                }
            });

            if (!pengguna) return res.status(400).send("No user with ID");

            encryptedPassword = await bcrypt.hash(password, 10);

            const upPass = await userModel.update(
                { password: encryptedPassword },
                { where: { id_register: id_register } }
            );

            res.status(201).send('Reset Password Sucessfully');
        }
    }
    catch (err) {
        console.log(err);
        res.json({ message: err });
    }
};

module.exports = {
    resetPassHandler
};