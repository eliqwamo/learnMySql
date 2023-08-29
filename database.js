import Sequelize from 'sequelize';

const connection = new Sequelize(
    //The name of the database
    "store_db",
    //The database username
    "root",
    //The password of the database
    "root",
    //The dialect host
    {
        dialect: "mysql",
        host: "localhost"
    }
);

export default connection;