const reviewModel = require('../models/reviewModel')
const planModel = require('../models/planModel')
const {updatePlan} = require('../controller/planController')


module.exports.getAllReviews = async function getAllReviews(req, res) {
    try {
        let reviews = await reviewModel.find()
        if (reviews) {
            return res.json({
                message: 'all reviews retreived',
                data: reviews
            })
        } else {
            res.json({
                message: 'review not found'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports.topThreeReviews = async function topThreeReviews(req, res) {
    try {
        let topReviews = await reviewModel.find().sort({rating: -1}).limit(3)
        return res.json({
            message: 'Top 3 reviews displayed',
            data: topReviews
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        }) 
    }
}

module.exports.getPlanReview = async function getPlanReview(req, res) {
    try {
        let id = req.params.id
        let reviews = await reviewModel.find()
        let planReviews = []
        for (let i=0; i<reviews.length; i++) {
            if (id == reviews[i].plan._id) {
                planReviews.push(reviews[i])
            }
        }
        return res.json({
            message: 'All reviews for this plan in retreived',
            data: planReviews
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        }) 
    }
}

module.exports.createReview = async function createReview(req, res) {
    try {
        let id = req.params.plan
        let plan = await planModel.findById(id)
        let dataObj = req.body
        let review = await reviewModel.create(dataObj)
        if (review) {
            plan.avgRating = (plan.avgRating + req.body.rating)/2
            await plan.save()
            res.json({
                message: 'review created',
                data: review
            })
        } else {
            res.json({
                message: 'error while reviewing'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        }) 
    }
}

module.exports.updateReview = async function updateReview(req, res) {
    try {
        let planid = req.params.id
        let id = req.body.id
        let review = await reviewModel.findById(id)
        let reviewToBeUpdated = req.body
        if (review) {
            const keys = []
            for (const key in reviewToBeUpdated) {
                if (key == 'id') {
                    continue
                }
                keys.push(key)
            }
            for (let i = 0; i < keys.length; i++) {
                review[keys[i]] = reviewToBeUpdated[keys[i]]
            }
            const updatedReview = await review.save()
            res.json({
                message: "data updated successfully",
                data: updatedReview
            }) 
        } else {
            res.json({
                message: "request denied"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        }) 
    }
}

module.exports.deleteReview = async function deleteReview(req, res) {
    try {
        let reviewid = req.body.id
        let data = await reviewModel.findById(reviewid)
        let deletePlan = await reviewModel.findById(reviewid).deleteOne()
        if (deletePlan.acknowledged) {
            res.json({
                message: "data deleted successfully",
                data: data
            })
        } else {
            res.json({
                message: "User not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        }) 
    }
}