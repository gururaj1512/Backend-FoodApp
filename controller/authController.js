const userModel = require('../models/userModel')
const {sendMail} = require('../utility/nodemailer')

const jwt = require('jsonwebtoken')
const JWT_KEY = 'leomessi';

const express = require('express');


module.exports.signup = async function signup(req, res) {
    try {
        let dataObj=req.body
        let user = await userModel.create(dataObj)
        // console.log('backend', dataObj);
        sendMail("signup", user)
        if (user) {
            let success = true
            return res.json({
                data: dataObj,
                success: success
            })
        } else {
            res.json({
                message: "error while signing in"
            })
        }
    } catch(err) {
        res.json({
            message:err.message
        })
    }
}

module.exports.login = async function login(req, res) {
    try {
        let data = req.body
        if (data.email) {
            let user = await userModel.findOne({email:data.email})
            if (user) {
                if (user.password == data.password) {
                    let uid = user['_id']
                    let token = jwt.sign({payload:uid}, JWT_KEY)
                    res.cookie('login', token)
                    let success = true
                    return res.json({
                        success: success,
                        authtoken: token,
                        userID : uid
                    })
                } else {
                    return res.json({
                        message: "Invalid credentials"
                    })
                }
            } else {
                return res.json({
                    message: "user not found"
                })
            }
        } else {
            return res.json({
                message: "empty feild found"
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

module.exports.logout = async function logout(req, res) {
    res.cookie('login', '', {maxAge:1})
    res.json({
        message:"User has been logged out successfully"
    })
}

// isAuthorised --> To check the user's role
module.exports.isAuthorised = function isAuthorised(roles) {
    return function(req, res, next) {
        if (roles.includes(req.role)==true) {
            next();
        } else {
            res.status(401).json({
                message: "operation not allowed"
            })
        }
    }
}

// protectRoute
module.exports.protectRoute = async function protectRoute(req, res, next) {
    try {
        let token;
        if (req.cookies.login) {
            token = req.cookies.login
            let payload = jwt.verify(token, JWT_KEY)
            if (payload) {
                const user = await userModel.findById(payload.payload)
                req.role = user.role
                req.id = user.id
                next()
            }
            else {
                return res.json({
                    message:'user not verified'
                })
            }
        } else {
            // Postman
            res.json({
                message: "Please login"
            })
            // Browser
            const client = req.get('User-Agent')
            if (client.includes("Mozilla")==true) {
                return res.redirect('/login')
            }
        }
    } catch(err) {
        return res.json({
            message:err.message
        })  
    }
}

module.exports.forgetPassword = async function forgetPassword(req, res) {
    let {email} = req.body
    try {
        const user = await userModel.findOne({email: email})
        if (user) {
            const resetToken = user.createResetToken()
            /* http://abc.com/resetPassword/resetToken */
            let resetPasswordLink = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`
            let obj = {
                resetPasswordLink: resetPasswordLink,
                email: email
            }
            sendMail("resetpassword", obj)
        } else {
            return res.json({
                message: 'please signup'
            })
        }
    } catch (err) {
        res.status(500).json({
            message:err.message
        })
    }
}

module.exports.resetPassword = async function resetPassword() {
    try {
        const token = req.params.token
        let {password, confirmPassword} = req.body
        const user = await userModel.findOne({resetToken: token})
        if (user) {
            user.resetPasswordHandler(password, confirmPassword)
            await user.save()
            res.json({
                message: "user password changed succesfully"
            })
        } else {
            res.json({
                message: "user not found"
            })
        }
    } catch(err) {
        res.json({
            message: err.message
        })
    }
}