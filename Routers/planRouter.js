const {protectRoute, isAuthorised} = require('../controller/authController')
const {getAllPlans, getPlan, createPlan, updatePlan, deletePlan, topThreePlans} = require('../controller/planController')

const express = require('express');
const planRouter = express.Router()


// All available plans
planRouter.route('/allPlans')
.get(getAllPlans)

// Top 3 available plans
planRouter.route('/topPlans')
.get(topThreePlans)

// Own Plan
planRouter.use(protectRoute)
planRouter.route('/plan/:id')
.get(getPlan)

planRouter.use(isAuthorised(['admin', 'restaurantowner']))
planRouter.route('/crudPlan')
.post(createPlan)

planRouter.route('/crudPlan/:id')
.patch(updatePlan)
.delete(deletePlan)


module.exports = planRouter