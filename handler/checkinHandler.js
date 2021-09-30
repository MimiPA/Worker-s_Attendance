const attendanceModel = require('../model/attendanceModel');
const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const haversine = require('haversine-distance');

process.env.TOKEN_KEY = "glints";

const checkinHandler = async (req, res) => {
    try {
        const token = req.body.token || req.query.token || req.headers["x-access-token"];
        const { latitude, longitude } = req.body;
        const today = moment().format('YYYY-MM-DD HH:mm:ss');

        if (!token) {
            return res.status(403).send("A token is required for authentication");
        }
        else if (!(latitude && longitude)) {
            return res.status(400).send({ status: "failed", message: "All input is required" });
        }
        else {
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);

            const dataUser = await userModel.findOne({
                where: {
                    id_register: decoded.id_register
                }
            });

            if (!dataUser) {
                return res.status(404).send({ status: 'failed', message: 'User account doesn\'t exist' });
            }
            else {
                const pointOffice = { lat: -5.1429776, lng: 119.4074496 };
                const pointUser = { lat: latitude, lng: longitude };

                let distance_m = haversine(pointOffice, pointUser);
                const jarak = Math.round(distance_m);

                let distance_km = distance_m / 1000;

                console.log("Distance meters : " + jarak);
                console.log("Distance km : " + distance_km);

                if (jarak <= 100) {
                    const user = await attendanceModel.create({
                        id_register: dataUser.id_register,
                        entryat: today,
                        checkin: 'Yes',
                        latitude: latitude,
                        longitude: longitude,
                        distance: jarak
                    });

                    return res.status(201).send({ status: "success", message: "Checkin success 'Yes'. Distance : " + user.distance });
                }
                else {
                    const user = await attendanceModel.create({
                        id_register: dataUser.id_register,
                        entryat: today,
                        checkin: 'No',
                        latitude: latitude,
                        longitude: longitude,
                        distance: jarak
                    });

                    return res.status(201).send({ status: "success", message: "Checkin success 'No'. Distance : " + user.distance });
                }
            }
        }
    }
    catch (err) {
        console.log(err);
        res.json({ message: err });
    }
};

module.exports = {
    checkinHandler
};