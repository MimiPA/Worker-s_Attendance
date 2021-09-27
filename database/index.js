const Sequelize = require('sequelize');
const db = {};
const sequelize = new Sequelize('denndsuq8po91s', 'uemfoqlmslqxla', 'feaa718624322e4d96fbf7f2b4575e814ead63f7a8860c58385a2dd278536f03', {
    host: '103.105.32.32',
    dialect: 'postgres',
    operatorsAliases: false,
    port: 5432,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;