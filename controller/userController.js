const userModel = require('../models/userModel')


module.exports.getUser = async function getUser(req, res) {
    let id = req.params.id
    let user = await userModel.find(id)
    if (user) {
        res.json(user);
    } else {
        return res.json({
            message:'user not found'
        })
    }
}

module.exports.updateUser = async function updateUser(req, res) {
    // console.log(req.body);
    try {
        let id = req.params.id
        let user = await userModel.findById(id);
        let dataToBeUpdated = req.body
        if (user) {
            const keys = []
            for (let key in dataToBeUpdated) {
                keys.push(key)
            }
            for (let i = 0; i < keys.length; i++) {
                user[keys[i]] = dataToBeUpdated[keys[i]]
            }
            const updatedData = await user.save()
            res.json({
                message: "data updated successfully",
                data: updatedData
            })
        } else {
            res.json({
                message: "request denied"
            })
        }
    } catch(err) {
        res.json({
            message:err.message
        })
    }
}

module.exports.deleteUser = async function deleteUser(req, res) {
    try {
        let id = req.params.id
        let user = await userModel.findByIdAndDelete(id)
        if (!user) {
            res.json({
                message: "User not found"
            })
        } else {
            res.json({
                message: "data deleted successfully"
            })
        }
    } catch(err) {
        res.json({
            message:err.message
        })
    }
}

module.exports.getAllUsers = async function getAllUsers(req ,res) {
    let users = await userModel.find()
    if (users) {
        res.json({
            message: 'user retreived',
            data: users
        })
    }
    res.send("user id received")
}

module.exports.updateProfileImage=function updateProfileImage(req,res){
    res.json({
      message:'file uploaded succesfully'
    });
}
