const { createSession } = require("../controller/bookingController");
const {protectRoute} = require('../controller/authController')


const express = require('express')
const bookingRouter = express.Router()
const path = require("path");


bookingRouter.post('/createSession', protectRoute, createSession)
bookingRouter.get('/createSession', function(req, res) {
    let indexPath = path.join(__dirname, "../view/booking.html");
    res.sendFile(indexPath);
})

module.exports = bookingRouter