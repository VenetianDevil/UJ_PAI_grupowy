const { DataTypes, Model } = require('sequelize')
const db = require('../config/database')

class Users extends Model {}

Users.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt:{
        type:DataTypes.DATE,
        allowNull:false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull:false
    }
}, {
    sequelize: db
})

Users.sync()

module.exports = Users