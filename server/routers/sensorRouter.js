const Router = require('express')
const router = new Router()
const sensorController = require('../controllers/sensorController.js')
const checkRole = require('../middleware/checkRoleMiddleware.js')

router.post('/', checkRole('ADMIN'), sensorController.create)
router.get('/', sensorController.getAll)
router.get('/One', sensorController.getOne)
router.put('/', checkRole('ADMIN'), sensorController.update)
router.delete('/', checkRole('ADMIN'), sensorController.delete)

module.exports = router