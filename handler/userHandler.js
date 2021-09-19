const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const moment = require('moment');
const jwt = require('jsonwebtoken');

process.env.TOKEN_KEY = "glints";

const addUserHandler = async (req, res) => {
    try {
        const { first_name, last_name, email, password, repassword } = req.body;
        const today = moment().format('YYYY-MM-DD HH:mm:ss');

        if (!(first_name && last_name && email && password && repassword)) {
            res.status(400).send("All input is required");
        }
        else if (password != repassword) {
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
                first_name: first_name,
                last_name: last_name,
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
};

const loginHandler = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        else {
            const user = await userModel.findOne({
                where: {
                    email: email
                }
            });

            if (user && (await bcrypt.compare(password, user.password))) {
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

                res.status(201).send({ status: 'success', message: token });
            }
            else {
                res.status(400).send("Invalid Credentials");
            }
        }
    }
    catch (err) {
        console.log(err);
        res.json({ message: err });
    }
};

module.exports = {
    addUserHandler,
    loginHandler
};