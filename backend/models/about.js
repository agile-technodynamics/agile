const mongoose = require('mongoose')

const aboutSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, '\nPlease enter title']
    },
    description: {
        type: String,
        required: [true, '\nPlease enter description']
    }
})

module.exports = mongoose.model('About', aboutSchema)