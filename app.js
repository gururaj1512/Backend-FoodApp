const cookieParser = require('cookie-parser')

const express = require('express');
const app = express();

app.use(express.json())
app.listen(3000)
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