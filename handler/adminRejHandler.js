const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');

const adminRejHandler = async (req, res) => {
    try {
        const token = req.body.token || req.query.token || req.headers["x-access-token"];

        if (!token) {
            return res.status(403).send("A token is required for authentication");
        }
        else {
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);

            if (decoded.id_level == 1) {
                return res.status(400).send({ status: 'failed', message: 'This is not admin' });
            }
            else if (decoded.id_level == 2) {
                const { id_register } = req.params;

                if (!(id_register)) {
                    return res.status(400).send({ status: "failed", message: "ID_Register is required" });
                }
                else {
                    const user = await userModel.findOne({
                        where: {
                            id_register: id_register
                        }
                    });

                    const upUser = await userModel.update(
                        {
                            account: 'Block',
                            token: 0
                        },
                        { where: { email: user.email } }
                    );

                    return res.status(200).send({
                        status: 'success',
                        email: user.email,
                        message: 'Block account success'
                    });
                }
            }
        }
    }
    catch (err) {
        console.log(err);
        return res.json({ message: err });
    }
};

module.exports = {
    adminRejHandler
};