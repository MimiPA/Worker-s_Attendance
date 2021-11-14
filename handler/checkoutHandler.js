const attendanceModel = require('../model/attendanceModel');
const userModel = require('../model/userModel');
const moment = require('moment');
const momentTZ = require('moment-timezone');
const jwt = require('jsonwebtoken');

process.env.TOKEN_KEY = "glints";

const checkoutHandler = async (req, res) => {
    try {
        const token = req.body.token || req.query.token || req.headers["x-access-token"];
        const exitat = momentTZ().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');

        if (!token) {
            return res.status(403).send("A token is required for authentication");
        }
        else {
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);

            const dataAttendance = await attendanceModel.findOne({
                where: {
                    id_register: decoded.id_register,
                    duration: '0'
                }
            });

            if (!dataAttendance) {
                return res.status(404).send({ status: 'failed', message: 'User attendance doesn\'t exist. Please checkIn' });
            }
            else {
                let ms = moment(dataAttendance.entryat, "YYYY-MM-DD HH:mm:ss").diff(moment(exitat, "YYYY-MM-DD HH:mm:ss"));
                let d = moment.duration(ms);
                let s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");

                const upData = await attendanceModel.update(
                    {
                        exitat: exitat,
                        duration: s
                    },
                    {
                        where: {
                            id_attendance: dataAttendance.id_attendance,
                            id_register: dataAttendance.id_register
                        }
                    }
                );

                if (!upData) {
                    return res.status(404).send({ status: 'failed', message: 'Gagal checkOut. Please try again' });
                }
                else {
                    return res.status(201).send({ status: "success", message: "CheckOut success", duration: s });
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
    checkoutHandler
};