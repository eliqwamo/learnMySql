import Sequelize from 'sequelize';
import database from '../database.js';

const Account = database.define(
    "accounts",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        firstName: Sequelize.STRING,
        lastName: Sequelize.STRING,
        isApproved: Sequelize.BOOLEAN,
        verifyCode: Sequelize.INTEGER
    });

    export default Account;