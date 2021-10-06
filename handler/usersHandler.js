const userModel = require('../model/userModel');
const attendanceModel = require('../model/attendanceModel');
const jwt = require('jsonwebtoken');

//userModel.hasMany(attendanceModel, {foreignKey: 'id_register'});

const usersHandler = async (req, res) => {
    try {
        // const token = req.body.token || req.query.token || req.headers["x-access-token"];

        // if (!token) {
        //     return res.status(403).send("A token is required for authentication");
        // }
        // else {
        //     const decoded = jwt.verify(token, process.env.TOKEN_KEY);

        //     if (decoded.id_level == 1) {
        //         return res.status(400).send({ status: 'failed', message: 'This is not admin' });
        //     }
        //     else if (decoded.id_level == 2) {
        //         const user = await userModel.findAll({
        //             attributes: { exclude: ['password', 'token'] },
        //             order: [['id_register', 'DESC']]
        //         });
                
        //         // const check = await userModel.findAll({
        //         //     include: [{
        //         //         model: attendanceModel,
        //         //         required: true
        //         //     }]
        //         // });

        //         res.status(200).send({
        //             status: 'success',
        //             data: {
        //                 user
        //             }
        //         });
        //     }
        // }

        if (decoded.id_level == 1) {
            return res.status(400).send({ status: 'failed', message: 'This is not admin' });
        }
        else if (decoded.id_level == 2) {
            const user = await userModel.findAll({
                attributes: { exclude: ['password', 'token'] },
                order: [['id_register', 'DESC']]
            });
            
            // const check = await userModel.findAll({
            //     include: [{
            //         model: attendanceModel,
            //         required: true
            //     }]
            // });

            res.status(200).send({
                status: 'success',
                data: {
                    user
                }
            });
        }
    }
    catch (err) {
        console.log(err);
        res.json({ message: err });
    }
};

module.exports = {
    usersHandler
}