const planModel = require('../models/planModel')

module.exports.getAllPlans = async function getAllPlans(req, res) {
    try {  
        let plans = await planModel.find()
        if (plans) {
            return res.json({
                message: 'all plans retreived',
                data: plans
            })
        } else {
            return res.json({
                message: 'plans not found',
            })
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports.getPlan = async function getPlan(req, res) {
    try {  
        let id = req.params.id
        let plan = await planModel.findById(id)
        if (plan) {
            return res.json({
                message: 'plan retreived',
                data: plan
            })
        } else {
            return res.json({
                message: 'plan not found'
            })
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports.createPlan = async function createlan(req, res) {
    try {
        let dataObj = req.body
        let plan = await planModel.create(dataObj)
        if (plan) {
            return res.json({
                message: "plan created successfully",
                data: plan
            })
        } else {
            res.json({
                message: "error while creating plan"
            })
        }
    } catch (err) {
        res.status(500).json({
            message:err.message
        })
    }
}

module.exports.updatePlan = async function updatePlan(req, res) {
    try {
        let id = req.params.id
        let planToBeUpdated = req.body
        let plan = await planModel.findById(id);
        if (plan) {
            const keys = []
            for (const key in planToBeUpdated) {
                keys.push(key)
            }
            for (let i = 0; i < keys.length; i++) {
                plan[keys[i]] = planToBeUpdated[keys[i]]
            }
            const updatedPlan = await plan.save()
            res.json({
                message: "data updated successfully",
                data: updatedPlan
            })
        } else {
            res.json({
                message: "request denied"
            })
        }
    } catch (err) {
        res.json({
            message:err.message
        })
    }
}

module.exports.deletePlan = async function deletePlan(req, res) {
    try {
        let id = req.params.id
        let deletePlan = await planModel.findOneAndDelete(id)
        if (!deletePlan) {
            res.json({
                message: "User not found"
            })
        } else {
            res.json({
                message: "data deleted successfully",
                data: deletePlan
            })
        }
    } catch (error) {
        res.json({
            message:error.message
        })
    }
}

module.exports.topThreePlans = async function topThreePlans(req, res) {
    try {
        let topPlans = await planModel.find().sort({avgRating: -1}).limit(3)
        return res.json({
            message: 'Top 3 plans displayed',
            data: topPlans
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}