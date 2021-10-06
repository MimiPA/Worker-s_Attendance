const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const sendEmail = require('./sendEmail');

process.env.TOKEN_KEY = "glints";

const resetPassHandler = async (req, res) => {
    try {
        const { id_register } = req.params;
        const { password, repassword } = req.body;

        if (!id_register) {
            return res.status(400).send({ status: 'failed', message: 'ID Register is missing' });
        }
        else if(!(password && repassword)){
            return res.status(400).send({ status: 'failed', message: 'All input required' });
        }
        else if(password != repassword){
            return res.status(400).send({ status: 'failed', message: "Please match both password" });
        }
        else {
            const pengguna = userModel.findOne({
                where: {
                    id_register: id_register
                }
            });

            if (!pengguna) return res.status(400).send({ status: 'failed', message: "No user with ID" });

            encryptedPassword = await bcrypt.hash(password, 10);

            const upPass = await userModel.update(
                { password: encryptedPassword },
                { where: { id_register: id_register } }
            );

            return res.status(201).send({ status: 'success', message: "Reset Password Successfully" });
        }
    }
    catch (err) {
        console.log(err);
        return res.json({ message: err });
    }
};

module.exports = {
    resetPassHandler
};