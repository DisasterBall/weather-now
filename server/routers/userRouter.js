const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController.js')
const authMiddleware = require('../middleware/authMiddleware.js')
const checkRole = require('../middleware/checkRoleMiddleware.js')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)

router.put('/', checkRole('ADMIN'), userController.update)
router.delete('/', checkRole('ADMIN'), userController.delete)
router.get('/', checkRole('ADMIN'), userController.getAll)
router.get('/One', checkRole('ADMIN'), userController.getOne)

module.exports = router