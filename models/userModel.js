const mongoose = require('mongoose');
const db_link = 'mongodb+srv://admin:ppchQ9vjxtZJrldK@cluster0.1updrw4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

mongoose.connect(db_link)
.then(function(db){
    console.log('db connected');
})
.catch(function(err){
    console.log(err);
})

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:function(){
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        // required:true,
        minLength:8,
        validate: function(){
            return this.confirmPassword==this.password
        }
    },
    role:{
        type:String,
        enum:['admin', 'user', 'restaurantowner', 'employee'],
        default:'user'
    },
    profileImage:{
        type:String,
        default:'image.jpeg'
    },
    resetToken:{
        type:String
    }
})

userSchema.pre('save', function(){
    this.confirmPassword = undefined;
})

userSchema.methods.createResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString("hex")
    this.resetToken = resetToken
    return resetToken
}

userSchema.methods.resetPasswordHandler = function(password, confirmPassword) {
    this.password = password
    this.confirmPassword = confirmPassword
    this.resetToken = undefined
}

const userModel = mongoose.model('userModel', userSchema)
module.exports = userModel