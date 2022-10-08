const Router = require('express')
const router = new Router()
const sensorRouter = require('./sensorRouter.js')
const userRouter = require('./userRouter.js')
const weatherRouter = require('./weatherRouter.js')

router.use('/user', userRouter)
router.use('/weather', weatherRouter)
router.use('/sensor', sensorRouter)

module.exports = router