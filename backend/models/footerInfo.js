const mongoose = require('mongoose')

const footerInfoSchema = mongoose.Schema({
    footerTitle:{
        type: String,
        required: [true, '\nPlease enter footer title']
    },
    footerDescription:{
        type: String,
        required: [true, '\nPlease enter footer description']
    },
    addressInfo:{
        type: String,
        required: [true, '\nPlease enter address info']
    },
    phoneInfo:{
        type: String,
        required: [true, '\nPlease enter phone info']
    },
    cellphoneInfo:{
        type: String,
        required: [true, '\nPlease enter cellphone info']
    },
    emailInfo:{
        type: String,
        required: [true, '\nPlease enter email info']
    }
})

module.exports = mongoose.model('FooterInfo', footerInfoSchema)