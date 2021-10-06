const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

process.env.TOKEN_KEY = "glints";

const loginHandler = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            return res.status(400).send({ status: "failed", message: "All input is required" });
        }
        else {
            const user = await userModel.findOne({
                where: {
                    email: email
                }
            });

            if (user && (await bcrypt.compare(password, user.password))) {
                const id_level = user.id_level;

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

                return res.status(201).send({
                    status: 'success',
                    token: token,
                    message: 'Login Success'
                });
            }
            else {
                return res.status(400).send({status: 'failed', message: 'Invalid Credentials'});
            }
        }
    }
    catch (err) {
        console.log(err);
        return res.json({ message: err });
    }
};

module.exports = {
    loginHandler
};