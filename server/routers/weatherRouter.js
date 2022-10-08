const Router = require('express')
const router = new Router()
const weatherController = require('../controllers/weatherController.js')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), weatherController.create)
router.get('/', weatherController.getAll)
router.get('/One', weatherController.getOne)

module.exports = router