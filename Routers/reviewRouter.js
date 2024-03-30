const {protectRoute} = require('../controller/authController')
const {getAllReviews, topThreeReviews, getPlanReview, createReview, updateReview, deleteReview} = require('../controller/reviewController')

const express = require('express')
const reviewRouter = express.Router()


reviewRouter.route('/allReviews')
.get(getAllReviews)

reviewRouter.route('/topReviews')
.get(topThreeReviews)

reviewRouter.route('/:id')
.get(getPlanReview)

reviewRouter.use(protectRoute)
reviewRouter.route('/crudReview/:plan')
.post(createReview)
.patch(updateReview)
.delete(deleteReview)


module.exports = reviewRouter