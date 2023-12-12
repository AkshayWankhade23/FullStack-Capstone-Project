const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

// Middleware
const app = express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({
        status: 'Success',
        message: 'All Good!!'
    })
})

app.listen(process.env.PORT, () => {
    mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => console.log('server running on http://localhost:${process.env.PORT}'))
        .catch(error => console.log(error))
})