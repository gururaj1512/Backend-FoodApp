const { getUser, updateUser, deleteUser, getAllUsers, updateProfileImage } = require('../controller/userController')
const { signup, login, logout, isAuthorised, protectRoute, forgetPassword, resetPassword } = require('../controller/authController')

const express = require('express')
const userRouter = express.Router()
const multer = require('multer')
const path = require("path");


userRouter.route('/:id')
    .patch(updateUser)
    .delete(deleteUser)

userRouter.route('/signup')
    .post(signup)

userRouter.route('/login')
    .post(login)

userRouter.route('/logout')
    .get(logout)

userRouter.route('/forgetPassword')
    .post(forgetPassword)

userRouter.route('/resetPassword/:token')
    .post(resetPassword)



/* MULTER */
const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../public/images')
    },
    filename: function (req, file, cb) {
        cb(null, `user-${Math.random()}.jpeg`)
    }
});

const filter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
        cb(null, true)
    } else {
        cb(new Error("Not an Image! Please upload an image"), false)
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: filter
});
userRouter.post("/ProfileImage", upload.single('photo'), updateProfileImage);
userRouter.get('/ProfileImage', (req, res) => {
    let indexPath = path.join(__dirname, "../multer.html")
    res.sendFile(indexPath)
});
/* MULTER */



userRouter.use(protectRoute)
userRouter.route('/userProfile')
    .get(getUser)

userRouter.use(isAuthorised(['admin']))
userRouter.route('')
    .get(getAllUsers)

module.exports = userRouter;