const stripe = require('stripe')('sk_test_51OzNTSSJTYpAWZEsntk8Sj6snfBQqXHfjIpF64genAKKn0dCdlRz2povZdih3aDxEHUmKwJRmS2xsZcwLqHANiD900lOAwLEID');

const planModel = require('../models/planModel')
const userModel = require('../models/userModel')

module.exports.createSession = async function createSession(req, res) {
    try {
        let userID = req.id
        let planId = req.params.id

        let user = await userModel.findById(userID)
        let plan = await planModel.findById(planId)

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: user.email,
            client_reference_id: plan.id,
            line_items: [
                {
                    name: plan.name,
                    description: plan.description,
                    amount: plan.price * 100,
                    currency: "inr",    
                    quantity: 1
                }
            ],
            success_url: `${req.protocol}://${req.get('host')}/profile`,
            cancel_url: `${req.protocol}://${req.get('host')}/profile`,
        })
        res.status(200).json({
            status: 'success',
            session
        })
    } catch (error) {
        res.status(200).json({
            error: error.message
        })
    }
}