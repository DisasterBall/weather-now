const {Sensor} = require('../models/models.js')
const ApiError = require('../error/ApiError.js');

class SensorController {
    async create(req, res, next) {
        try {
            const {address, latitude, longitude, status} = req.body
            const sensor = await Sensor.create({address, latitude, longitude, status});
            return res.json(sensor)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res, next) {
        try{
            const sensors = await Sensor.findAll()
            return res.json(sensors)
        }catch(e){
            next(ApiError.internal(e.message))
        }
        
    }

    async getOne(req, res) {
        try{
            const {id} = req.body
            const sensor = await Sensor.findByPk(id)
            return res.json(sensor)
        }catch(e){
            next(ApiError.internal(e.message))
        }
        
    }

    async update(req, res, next) {
        try {
            const updatedSensor = await Sensor.update({ 
                address: req.body.address,
                latitude: req.body.latitude,
                longitude: req.body.longitude
            }, {where:{id: req.body.id},
            returning: true,
            plain: true})
            return res.status(200).send('All Right!')
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            await Sensor.destroy({where: {id: req.body.id}})
            return res.status(200).send('All Right!')
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }
}

module.exports = new SensorController()