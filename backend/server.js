require('dotenv').config()
require('express-async-errors')
const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const errorHandler = require('./middleware/errorHandler')
const { logger, logEvents } = require('./middleware/logger')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConnection')
const PORT = process.env.PORT

mongoose.set('strictQuery', false)
connectDB()

app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))

app.use('/user', require('./routes/userRoutes'))

//app.use('/jobs', require('./routes/jobRoutes'))

app.use('/auth', require('./routes/authRoutes'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: "404 ERROR: Not Found" })
    } else {
        res.type('txt').send('404 ERROR: Not Found')
    }
})


app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})

