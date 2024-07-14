require('dotenv').config();
const { Sequelize } = require("sequelize");

const { PASS_DB, USER_DB, NAME_DB} = process.env;

const sequelize = new Sequelize(NAME_DB,USER_DB,PASS_DB,{
    host:'localhost',
    dialect:'postgres'
});




module.exports = {
    conn: sequelize,
}
