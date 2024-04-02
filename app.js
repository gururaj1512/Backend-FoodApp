const cookieParser = require('cookie-parser')

const express = require('express');
const app = express();
var cors = require('cors')

app.use(express.json(), cors())
app.listen(5000)
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


const userRouter = require('./Routers/userRouter')
app.use('/user', userRouter)

const planRouter = require('./Routers/planRouter')
app.use('/plans', planRouter)

const reviewRouter = require('./Routers/reviewRouter')
app.use('/reviews', reviewRouter)

const bookingRouter = require('./Routers/bookingRouter')
app.use('/booking', bookingRouter)