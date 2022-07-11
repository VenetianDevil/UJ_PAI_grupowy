'use strict';

const { Model, DataTypes } = require('sequelize');
const db = require('../config/database');

class CompanyProfiles extends Model {}
CompanyProfiles.init({
    companyID: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    HQLocation: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    imageURL: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    info: {
        type: DataTypes.STRING,
        allowNull: true
    },
    linkedIn: {
        type: DataTypes.STRING,
        allowNull: true
    },
    instagram: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    companyURL: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    }},
    {
        sequelize:db,
});

CompanyProfiles.sync();

module.exports = CompanyProfiles
