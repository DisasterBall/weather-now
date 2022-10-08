const sequelize = require('../db.js')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, unique: true, allowNull: false,},
    email: {type: DataTypes.STRING, unique: true, allowNull: false,},
    password: {type: DataTypes.STRING, allowNull: false,},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Sensor = sequelize.define('sensor', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    address: {type: DataTypes.STRING, allowNull: false},
    latitude: {type: DataTypes.REAL, allowNull: false},
    longitude: {type: DataTypes.REAL, allowNull: false},
    status: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true},
    userId: {type: DataTypes.INTEGER, defaultValue: 1}
})

const Weather = sequelize.define('weather', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    temperature: {type: DataTypes.FLOAT, allowNull: false,},
    humidity: {type: DataTypes.FLOAT, allowNull: false,},
    windSpeed: {type: DataTypes.FLOAT, allowNull: false,},
    date: {type: DataTypes.DATE, allowNull: false,},
    time: {type: DataTypes.TIME, allowNull: false,},
})

User.hasMany(Sensor)
Sensor.belongsTo(User)

Sensor.hasMany(Weather)
Weather.belongsTo(Sensor)

module.exports = {
    User,
    Sensor,
    Weather
}