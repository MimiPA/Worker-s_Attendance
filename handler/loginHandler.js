const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const moment = require('moment');
const jwt = require('jsonwebtoken');

process.env.TOKEN_KEY = "glints";

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
    loginHandler
};