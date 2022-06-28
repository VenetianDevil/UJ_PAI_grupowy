'use strict';

const { Model, DataTypes } = require('sequelize');
const db = require('../config/database');


class JobOffer extends Model {}
JobOffer.init({
    offerID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
        type: DataTypes.STRING,
        allowNull: false,
    },

    remote: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    info: {
        type: DataTypes.STRING
    },
    offerURL: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    end_date: {
        type: DataTypes.TIME,
        allowNull: false,
    }
},
{
    sequelize:db,
    timestamps:false,
});

JobOffer.sync();
module.exports = JobOffer;


