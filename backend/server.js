require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const errorHandler = require('./middleware/errorHandler')
const { logger, logEvents } = require('./middleware/logger')


app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))

app.use('/users', require('./routes/userRoutes'))

app.use('/jobs', require('./routes/jobRoutes'))

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


app.listen(PORT, () => console.log(`Server is listening to PORT ${PORT}`))