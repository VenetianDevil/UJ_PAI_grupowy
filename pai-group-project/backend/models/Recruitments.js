'use strict';

const { Model, DataTypes } = require('sequelize');
const db = require('../config/database');

class Recruitments extends Model {}

Recruitments.init({
    RecruitmentID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    offerID:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    status:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    stage:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},{
    sequelize:db,
});

Recruitments.sync();
module.exports = Recruitments;