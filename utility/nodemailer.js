const nodemailer = require("nodemailer");
require('dotenv').config()
var mailer_address = process.env.MAILER_ADDRESS
var mailer_password = process.env.MAILER_PASS

module.exports.sendMail = async function sendMail(str, data) {

    const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: mailer_address,
        pass: mailer_password,
    },
    });

    var Osubject, Otext, Ohtml;
    if (str == 'signup') {
        Osubject = `Thank you ${data.name} for signing in`
        Ohtml = `
            <h1>Welcome to FoodApp.com</h1>
            <p>Hope you have a good time..!</p>
            <ul>
                <p>Here are your details : </p>
                <li>Name - ${data.name}</li>
                <li>Email - ${data.email}</li>
            </ul>
        `
    } 
    if (str == 'resetpassword') {
        Osubject = `Reset Password`
        Ohtml = `
            <h1>FoodApp.com</h1>
            <p>Here is your link to reset your password</p>
            <p>${data.resetPasswordLink}</p>
        `
    }

    let info = await transporter.sendMail({
        from: '"Food App" <gururajgurram1512@gmail.com>',
        to: data.email,
        subject: Osubject,
        html: Ohtml
    })
    console.log("Message sent is : %s", info.messageId)
}