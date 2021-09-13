const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const moment = require('moment');
const jwt = require('jsonwebtoken');

process.env.TOKEN_KEY = "glints";

const addUserHandler = async (req, res) => {
    try {
        const { email, password, repassword } = req.body;
        const today = moment().format('YYYY-MM-DD HH:mm:ss');

        if (!(email && password && repassword)) {
            res.status(400).send("All input is required");
        }

        if (password != repassword) {
            res.status(400).send("Please match both password");
        }
        else {
            const oldUser = await userModel.findOne({
                where: {
                    email: email
                }
            });

            if (oldUser) {
                return res.status(409).send("User Already Exist. Please Login");
            }

            encryptedPassword = await bcrypt.hash(password, 10);

            const user = await userModel.create({
                email: email,
                password: encryptedPassword,
                createdAt: today,
            });

            const token = jwt.sign(
                { id_register: user._id_register, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "1h",
                }
            );

            const upUser = await userModel.update(
                { token: token },
                { where: { email: user.email } }
            );

            res.status(201).json(token);
        }
    }
    catch (err) {
        console.log(err);
        res.json({ message: err });
    }
}

module.exports = {
    addUserHandler
};