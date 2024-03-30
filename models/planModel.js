const mongoose = require('mongoose');
const db_link = 'mongodb+srv://admin:ppchQ9vjxtZJrldK@cluster0.1updrw4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(db_link)
.then(function(db){
    console.log('plan db connected');
})
.catch(function(err){
    console.log(err);
})


const planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxLength: [20, 'plan name should not exceed 20 characters']
    },
    duration: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: [true, 'Price not entered']
    },
    avgRating: {
        type: Number
    },
    discount: {
        type: Number,
        validate : [function() {
            return this.discount < 100
        }, 'discount should not exceed price']
    }
})


const planModel = mongoose.model('planModel', planSchema)
module.exports = planModel