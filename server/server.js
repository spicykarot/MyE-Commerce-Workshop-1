const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
// const dotenv = require('dotenv')
require('dotenv').config();
const { readdirSync } = require('fs')
const connectDB = require('./configs/db')


const app = express()

connectDB();

// Middle Ware
app.use(morgan('dev'))
app.use(bodyParser.json({limit:'20mb'}))
app.use(cors())


// Route
// http://localhost:3000/api/
// วิธีที่ 1
// app.use('/api',require('./routes/api'))

// วิธีที่ 2 รองรับมีหลายไฟล์ api
readdirSync('./routes').map((r)=> 
    app.use('/api',require('./routes/' + r)))

const port = process.env.PORT
app.listen(port,() => {
    console.log('Service is running on port ' + port)
})