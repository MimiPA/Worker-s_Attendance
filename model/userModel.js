const Sequelize = require('sequelize');
const db = require('../database');

module.exports = db.sequelize.define(
    'registers',
    {
        id_register: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        full_name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        createdat: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        account: {
            type: Sequelize.STRING,
            defaultValue: 'Deactive'
        },
        token: {
            type: Sequelize.STRING,
            defaultValue: 0
        }
    },
    {
        timestamps: false
    }
);