const Inquiry = require('../models/inquiry')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const sendEmailInquiry = require('../utils/sendEmailInquiry')
const sendEmailToSender = require('../utils/sendEmailToSender')

// Create new Inquiry => /api/v1/inquiry/new
exports.newInquiry = catchAsyncErrors(async (req, res, next) => {
    const {
        firstName,
        lastName,
        customerEmail,
        companyName,
        contactNumber,
        position,
        concernType,
        customerMessage
    } = req.body

    const today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const yyyy = today.getFullYear()
    const hrs = String(today.getHours()).padStart(2, '0')
    const minutes = String(today.getMinutes()).padStart(2, '0')
    const todayDate = mm + '/' + dd + '/' + yyyy
    const todayTime = hrs + ':' + minutes

    const inquiry = await Inquiry.create({
        firstName,
        lastName,
        customerEmail,
        companyName,
        contactNumber,
        position,
        concernType,
        customerMessage,
        createdAt: todayDate + ' ' + todayTime
    })

    const message =
        `<body style="background-color:#e2e1e0;font-family: Open Sans, sans-serif;font-size:100%;font-weight:400;line-height:1.4;color:#000;">
            <table style="max-width:670px;margin:50px auto 10px;background-color:#fff;padding:50px;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;-webkit-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);-moz-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24); border-top: solid 10px #1b1449;">
                <thead>
                    <tr>
                    <th style="text-align:left;"><img style="max-width: 300px;" src="https://res.cloudinary.com/agiletechnodynamicsinc/image/upload/v1615205387/websiteImages/agile-header-logo_tan5lw.png" alt="logo"></th>
                    <th style="text-align:right;font-weight:400;">${todayDate} ${todayTime}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td style="height:35px;"></td>
                    </tr>
                    <tr>
                    <td colspan="2" style="border: solid 1px #ddd; padding:10px 20px;">
                        <p style="font-size:14px;margin:0 0 6px 0;"><span style="font-weight:bold;display:inline-block;min-width:150px">Concern Type</span><b style="color:green;font-weight:normal;margin:0">${concernType}</b></p>
                    </td>
                    </tr>
                    <tr>
                    <td style="height:35px;"></td>
                    </tr>
                    <tr>
                    <td style="width:100%;padding:20px;vertical-align:top">
                        <h2 style="margin:0 0 10px 0;padding:0;;">Sender Details</h2>
                        <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px">Name</span> ${firstName} ${lastName}</p>
                        <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">Company & Position</span> ${companyName}, ${position}</p>
                        <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">Email</span> ${customerEmail}</p>
                        <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">Phone</span> ${contactNumber}</p>
                    </td>
                    </tr>
                    <tr>
                    <td colspan="2" style="padding:30px 15px 0 15px;">
                        <h2 style="margin:0 0 10px 0;padding:0;">Message Content</h2>
                    </td>
                    </tr>
                    <tr>
                    <td colspan="2" style="padding:15px;">
                        <p style="font-size:14px;margin:0;padding:10px;text-align: justify">
                        ${customerMessage}
                        </p>
                    </td>
                    </tr>
                </tbody>
            </table>
        </body>`

    await sendEmailInquiry({
        email: process.env.SMTP_EMPLOYEE_EMAIL,
        subject: `New ${req.body.concernType} request`,
        message
    })
    
    await sendEmailToSender({
        email: customerEmail,
        subject: `Agile Technodynamics, Inc.`,
        message
    })

    res.status(200).json({
        success: true,
        message: `Email sent to Agile Technodynamics`,
        inquiry
    })
})

// Get single inquiry => /api/v1/admin/inquiry/:id
exports.getSingleInquiry = catchAsyncErrors(async (req, res, next) => {
    const inquiry = await Inquiry.findById(req.params.id)

    if (!inquiry) {
        return next(new ErrorHandler('No Inquiry found with this ID', 404))
    }

    res.status(200).json({
        success: true,
        inquiry
    })
})

// Get all inquiries => /api/v1/admin/inquiries
exports.getAllInquiries = catchAsyncErrors(async (req, res, next) => {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 })

    const inquiryCount = await Inquiry.countDocuments({ concernType: "Inquiry", inquiryStatus: "Unresolved" })
    const appointmentCount = await Inquiry.countDocuments({ concernType: "Appointment", inquiryStatus: "Unresolved" })
    const otherCount = await Inquiry.countDocuments({ concernType: "Others", inquiryStatus: "Unresolved" })

    res.status(200).json({
        success: true,
        inquiryCount,
        appointmentCount,
        otherCount,
        inquiries
    })
})

// Update inquiry status => /api/v1/admin/inquiry/:id
exports.updateInquiryStatus = catchAsyncErrors(async (req, res, next) => {
    const newInquiryStatus = {
        inquiryStatus: req.body.inquiryStatus
    }

    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, newInquiryStatus, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    if (!inquiry) {
        return next(new ErrorHandler('No Inquiry found with this ID', 404))
    }

    res.status(200).json({
        success: true,
        inquiry
    })
})

// Delete Inquiry => /api/v1/admin/inquiry/:id
exports.deleteSingleInquiry = catchAsyncErrors(async (req, res, next) => {
    const inquiry = await Inquiry.findById(req.params.id)

    if (!inquiry) {
        return next(new ErrorHandler('No Inquiry found with this ID', 404))
    }

    await inquiry.remove()

    res.status(200).json({
        success: true
    })
})