const mongoose = require('mongoose')
const validator = require('validator')

const today = new Date()
const dd = String(today.getDate()).padStart(2, '0')
const mm = String(today.getMonth() + 1).padStart(2, '0')
const yyyy = today.getFullYear() 
const hrs = String(today.getHours()).padStart(2,'0')
const minutes = String(today.getMinutes()).padStart(2,'0')
const todayDate = mm + '/' + dd + '/' + yyyy
const todayTime = hrs +':'+ minutes

const inquirySchema = mongoose.Schema({
    firstName:{
        type: String,
        required: [true, '\nPlease enter first name']
    },
    lastName:{
        type: String,
        required: [true, '\nPlease enter last name']
    },
    customerEmail:{
        type: String,
        required: true,
        validate: [validator.isEmail, '\nPlease enter valid email address']
    },
    companyName:{
        type: String,
        required: [true, '\nPlease enter company name']
    },
    contactNumber:{
        type: String,
        required: [true, '\nPlease enter contact number'],
        minlength: [11, '\nYour number cannot be lower than 11 characters'],
        maxlength: [13, '\nYour number cannot exceed 13 characters']
    },
    position:{
        type: String,
        required: [true, '\nPlease enter company pocition']
    },
    concernType:{
        type: String,
        required: [true, '\nPlease select concern type'],
        enum: {
            values: [
                'Inquiry',
                'Appointment',
                'Others'
            ]
        }
    },
    customerMessage: {
        type: String,
        required: [true, '\nPlease enter message']
    },
    inquiryStatus: {
        type: String,
        required: true,
        default: 'Unresolved'
    },
    createdAt: {
        type: String,
        default: todayDate + ' ' + todayTime
    }
})

module.exports = mongoose.model('Inquiry', inquirySchema)