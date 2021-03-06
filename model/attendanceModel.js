const Sequelize = require('sequelize');
const db = require('../database');

module.exports = db.sequelize.define(
    'attendances',
    {
        id_attendance: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_register: {
            type: Sequelize.INTEGER,
            foreignKey: true
        },
        entryat: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        exitat: {
            type: Sequelize.DATE,
            defaultValue: '2000-01-01 00:00:00'
        },
        checkin: {
            type: Sequelize.STRING,
            defaultValue: 'No'
        },
        latitude: {
            type: Sequelize.STRING
        },
        longitude: {
            type: Sequelize.STRING
        },
        distance: {
            type: Sequelize.STRING
        },
        duration: {
            type: Sequelize.STRING,
            defaultValue: '0'
        }
    },
    {
        timestamps: false
    }
);