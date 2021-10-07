const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const sendEmail = require('./sendEmail');

process.env.TOKEN_KEY = "glints";

const passHandler = async (req, res) => {
    try {
        const { id_register } = req.params;

        if (!id_register) {
            return res.status(400).send({ status: 'failed', message: 'ID Register is missing' });
        }
        else {
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body><form action="/reset/' + req.params.id_register + '" method="POST">' +
                '<input type="hidden" name="id_register" value="' + req.params.id_register + '" />' +
                '<input type="password" name="password" value="" placeholder="Enter your new password..." />' +
                '<input type="repassword" name="repassword" value="" placeholder="Confirm Password..." />' +
                '<input type="submit" value="Reset Password" />' +
                '</form></body></html>');
        }
    }
    catch (err) {
        console.log(err);
        return res.json({ message: err });
    }
};

module.exports = {
    passHandler
};