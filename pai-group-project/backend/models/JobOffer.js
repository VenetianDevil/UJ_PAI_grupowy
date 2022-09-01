'use strict';

const { Model, DataTypes } = require('sequelize');
const db = require('../config/database');


class JobOffers extends Model {}
JobOffers.init({
    offerID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    companyID: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },

    categories: {
        type: DataTypes.STRING,
        allowNull: false
    },
    workMode: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    remote: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    offerInfo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    offerURL: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    createdAt:{
        type:DataTypes.DATE,
        allowNull:false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull:false
    }

},
{
    sequelize:db,
    timestamps:true,
});

JobOffers.sync();
module.exports = JobOffers;


