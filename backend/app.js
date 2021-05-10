const express = require('express')
const app = express()

const cookieParser = require('cookie-parser')
const bodyparser = require('body-parser')
const fileUpload = require('express-fileupload')
const errorMiddleware = require('./middlewares/errors')
const path = require('path')

app.use(express.json())
app.use(bodyparser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(fileUpload())

// Setting up config file
if(process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })
  
//Import all the routes
const products = require('./routes/product')
const auth = require('./routes/auth')
const inquiry = require('./routes/inquiry')
const home = require('./routes/home')
const about = require('./routes/about')
const footerInfo = require('./routes/footerInfo')
const services = require('./routes/services')

app.use('/api/v1/', products)
app.use('/api/v1/', auth)
app.use('/api/v1/', inquiry)
app.use('/api/v1/', home)
app.use('/api/v1/', about)
app.use('/api/v1/', footerInfo)
app.use('/api/v1', services)

if(process.env.NODE_ENV === 'PRODUCTION'){
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}

//Middleware to handle errors
app.use(errorMiddleware)

module.exports = app