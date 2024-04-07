const cookieParser = require('cookie-parser')

const express = require('express');
const app = express();
var cors = require('cors')

app.use(express.json(), cors())
app.listen(5000)
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

require('dotenv').config()
let key = process.env.MONGO_KEY

const mongoose = require('mongoose');
const db_link = `mongodb+srv://admin:${key}@cluster0.1updrw4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(db_link)
.then(function(db){
    console.log('db connected');
})
.catch(function(err){
    console.log(err);
})


const userRouter = require('./Routers/userRouter')
app.use('/user', userRouter)

const planRouter = require('./Routers/planRouter')
app.use('/plans', planRouter)

const reviewRouter = require('./Routers/reviewRouter')
app.use('/reviews', reviewRouter)

const bookingRouter = require('./Routers/bookingRouter')
app.use('/booking', bookingRouter)