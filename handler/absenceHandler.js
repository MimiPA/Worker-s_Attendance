const userModel = require('../model/userModel');
const attendanceModel = require('../model/attendanceModel');
const momentTZ = require('moment-timezone');
const jwt = require('jsonwebtoken');
const { sequelize, Sequelize } = require('../database');
const { Op } = require('sequelize');

//userModel.hasMany(attendanceModel, { foreignKey: 'id_register' });

const absenceHandler = async (req, res) => {
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
                const startDate = momentTZ().tz('Asia/Jakarta').startOf('month').format('YYYY-MM-DD HH:mm:ss');
                const endDate = momentTZ().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');

                const user = await userModel.findAll({
                    attributes: { exclude: ['password', 'token'] },
                    order: [['id_register', 'DESC']]
                });

                // const absen = await attendanceModel.findAll({
                //     attributes: [
                //         'id_register',
                //         [sequelize.fn('COUNT', sequelize.col('attendances.checkin')), 'bolos']
                //     ],
                //     where:{
                //         checkin: 'No'
                //     },
                //     group: 'attendances.id_register'
                // });

                const absen = await userModel.findAll({
                    group: ['registers.id_register'],
                    includeIgnoreAttributes: false,
                    attributes: [
                        "id_register",
                        "full_name",
                        [sequelize.fn('COUNT', sequelize.col('attendances.checkin')), 'bolos'],
                    ],
                    include: [{
                        model: attendanceModel,
                        where: {
                            checkin: 'No',
                            entryat: {
                                [Op.between]: [startDate, endDate]
                            }
                        },
                    }],
                    having: Sequelize.literal('count(attendances.checkin) >=3'),
                });

                // const absen = await sequelize.query(`SELECT "registers"."id_register", "registers"."full_name", COUNT("attendances"."checkin") AS "bolos" FROM "registers" AS "registers", "attendances" AS "attendances" WHERE "registers"."id_register" = "attendances"."id_register" AND "attendances"."checkin" = 'No' AND bolos >= 3 GROUP BY "registers"."id_register";`, {
                //     type: Sequelize.QueryTypes.SELECT
                // });

                // const check = await userModel.findAll({
                //     include: [{
                //         model: attendanceModel,
                //         required: true
                //     }]
                // });

                res.status(200).send({
                    status: 'success',
                    start: startDate,
                    end: endDate,
                    data: {
                        absen
                    }
                });
            }
        }
    }
    catch (err) {
        console.log(err);
        return res.json({ message: err });
    }
};

module.exports = {
    absenceHandler
}