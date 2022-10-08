require('dotenv').config()
const express = require('express')
const sequelize = require('./db.js')
const models = require('./models/models.js')
const cors = require('cors')
const router = require('./routers/index.js')
const i18next = require('i18next')
const backend = require('i18next-fs-backend')
const middleware = require('i18next-http-middleware')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 5000

i18next
  .use(backend)
  .use(middleware.LanguageDetector)
  .init({
   fallbackLng: 'en',
   backend: {
     loadPath: './locales/{{lng}}/translation.json'
   }
  })


const app = express()
app.use(middleware.handle(i18next))
app.use(cors())
app.use(express.json())
app.use('/api', router)

app.use(errorHandler)


const start = async() => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

    }catch (e) {
        console.log(e)
    }
}

start()

