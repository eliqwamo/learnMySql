import Sequelize from 'sequelize';
import database from '../database.js';

const Product = database.define(
    "products",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        productBrand: Sequelize.STRING,
        productName: Sequelize.STRING,
        productPrice: Sequelize.FLOAT,
        unitInStock: Sequelize.INTEGER,
        productImage: Sequelize.STRING,
        isPublished: Sequelize.BOOLEAN
    });

    export default Product;