require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/users', require('./routes/userRoutes'))

app.use('/jobs', require('./routes/jobRoutes'))



app.listen(PORT, () => console.log(`Server is listening to PORT ${PORT}`))