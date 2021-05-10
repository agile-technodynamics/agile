const mongoose = require('mongoose')

const homeSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, '\nPlease enter name']
    },
    description: {
        type: String,
        required: [true, '\nPlease enter description']
    },
    image: {
        public_id:{
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }
})
module.exports = mongoose.model('Home', homeSchema)