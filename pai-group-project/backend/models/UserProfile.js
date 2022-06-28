'use strict';

const { Model, DataTypes } = require('sequelize');
const db = require('../config/database');

class UserProfile extends Model {}
UserProfile.init({
    userID: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:true
    },
    givenName :{
        type: DataTypes.STRING,
        allowNull: true
    },

    familyName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phoneNumber:{
        type:DataTypes.STRING,
        allowNull:true
    },
    imageURL :{
        type: DataTypes.STRING,
        allowNull:true
    },
    info: {
        type: DataTypes.STRING,
        allowNull:true
    },
    linkedIn:{
        type:DataTypes.STRING,
        allowNull:true
    },
    gitHub:{
        type:DataTypes.STRING,
        allowNull:true
    },
    instagram :{
        type: DataTypes.STRING,
        allowNull:true
    },
    portfolioURL: {
        type: DataTypes.STRING,
        allowNull:true
    },
    cvURL:{
        type:DataTypes.STRING,
        allowNull:true
    }
    
},
{
    sequelize:db,
});

UserProfile.sync();
module.exports = UserProfile;