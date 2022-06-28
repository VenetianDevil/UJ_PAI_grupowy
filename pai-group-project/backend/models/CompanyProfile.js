'use strict';

const { Model, DataTypes } = require('sequelize');
const db = require('../config/database');

class CompanyProfile extends Model {}
CompanyProfile.init({
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
    }},
    {
        sequelize:db,
});

CompanyProfile.sync();

module.exports = CompanyProfile
