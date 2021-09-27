const Sequelize = require('sequelize');
const db = {};
// const sequelize = new Sequelize('denndsuq8po91s', 'uemfoqlmslqxla', 'feaa718624322e4d96fbf7f2b4575e814ead63f7a8860c58385a2dd278536f03', {
//     host: 'localhost',
//     dialect: 'postgres',
//     operatorsAliases: false,

//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// });

const sequelize = new Sequelize('postgres://uemfoqlmslqxla:feaa718624322e4d96fbf7f2b4575e814ead63f7a8860c58385a2dd278536f03@ec2-52-206-193-199.compute-1.amazonaws.com:5432/denndsuq8po91s');

db.sequelize = sequelize;
db.Sequelize = Sequelize;

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = db;