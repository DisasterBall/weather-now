const {Weather} = require('../models/models.js')

class WeatherController {
    async create(req, res) {
        const {temperature, humidity, windSpeed, date, time, sensorId} = req.body
        const weather = await Weather.create({temperature, humidity, windSpeed, date, time, sensorId})
        return res.json(weather)
    }

    async getAll(req, res) {
        const weathers = await Weather.findAll()
        return res.json(weathers)
    }

    async getOne(req, res) {
        const {id} = req.body
        const weather = await Weather.findByPk(id)
        return res.json(weather)
    }
}

module.exports = new WeatherController()