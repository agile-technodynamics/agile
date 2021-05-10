const User = require('../models/user')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const cloudinary = require('cloudinary')
const passVal = require('../utils/passwordValidation')

//Get Access Code => /api/v1/accessLogin
exports.accessLogin = catchAsyncErrors( async(req, res, next) => {
    const accessCode =  process.env.ACCESS_CODE

    res.status(200).json({
        accessCode
    })
})

// Login User => /api/v1/login
exports.loginUser = catchAsyncErrors( async(req, res, next) => {
    const {email, password} = req.body

    //Checks if email and password is entered by user
    if(!email || !password){
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    // Finding user in database
    const user = await User.findOne({ email }).select('+password')

    if(!user){
        return next(new ErrorHandler('Invalid Email or Password', 401))
    }

    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password)

    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid Email or Password', 401))
    }

    sendToken(user, 200, res)
})

// Forgot Password      => /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if(!user){
        return next(new ErrorHandler('User not found with this email', 404))
    }

    // Get reset token 
    const resetToken = user.getResetPasswordToken()

    await user.save({ validateBeforeSave: false })

    // Create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`

    const message = `<body style="background-color:#e2e1e0;font-family: Open Sans, sans-serif;font-size:100%;font-weight:400;line-height:1.4;color:#000;">
    <table style="max-width:670px;margin:50px auto 10px;background-color:#fff;padding:50px;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;-webkit-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);-moz-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24); border-top: solid 10px #1b1449;">
      <thead>
        <tr>
          <th style="text-align:left;"><img style="max-width: 300px;" src="https://res.cloudinary.com/agiletechnodynamicsinc/image/upload/v1615205387/websiteImages/agile-header-logo_tan5lw.png"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="height:35px;"></td>
        </tr>
        <tr>
          <td colspan="2" style="padding:10px 20px;">
            <p >You have requested to reset your password.</p>
            <p>Click on the link below to reset password.</p>
            <p style="font-size:14px;margin:0 0 6px 0;"><b style="font-weight:normal;margin:0">${resetUrl}</p>
              <br/>
              <hr/>
              <br/>
              <p style="font-size:12px;margin:0 0 6px 0;">If you have not requested to reset your password, ignore this email.</b></p>
          </td>
        </tr>
      </tbody>
    </table>
  </body>`

    try {
        await sendEmail({
            email: user.email,
            subject: 'Account Password Recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`
        })
        
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save({ validateBeforeSave: false })

        return next(new ErrorHandler(error.message, 500))
    }
})

// Reset Password      => /api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    // Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken, 
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user){
        return next(new ErrorHandler('Password reset token is invalid or expired', 400))
    }
    if (passVal.validate(req.body.password) !== true){
        return next(new ErrorHandler('Please follow password format', 400))
    }

    if(req.body.password == '' || req.body.confirmPassword == ''){
        return next(new ErrorHandler('Password cannot be blank', 400))
    }
    else{
        if(req.body.password !== req.body.confirmPassword) {
            return next(new ErrorHandler('Password does not match', 400))
        }
    }

    if(user.password === req.body.password){
        return next(new ErrorHandler('Password already used', 400))
    }
    else{
        // Setup new password
        user.password = req.body.password
    }

    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    sendToken(user, 200, res)
})

// Get currently logged in user details => /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        user
    })
})

// Update  / Change Password => /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password')

    // Check previous user password
    const isMatched = await user.comparePassword(req.body.oldPassword)
    if(!isMatched){
        return next(new ErrorHandler('Old Password is incorrect', 400))
    }
    if (passVal.validate(req.body.newPassword) !== true){
        return next(new ErrorHandler('Please follow password format', 400))
    }

    user.password = req.body.newPassword
    await user.save()

    sendToken(user, 200, res)
})

//  Update user Profile => /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        contactNumber: req.body.contactNumber,
        address: req.body.address
    }

    if(req.body.avatar !== '') {
        const user = await User.findById(req.user.id)

        const image_id = user.avatar.public_id
        
        if(image_id !=='avatars/default-avatar_uzyujj.png' ){
            const res = await cloudinary.v2.uploader.destroy(image_id)
        }
        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 300,
            crop: "scale"
        })

        newUserData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData , {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})

// Logout user  => /api/v1/logout
exports.logout = catchAsyncErrors( async( req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
})


// SUPERADMIN CONTROLLERS
// Register a user => /api/v1/superadmin/register
exports.registerUser = catchAsyncErrors( async(req, res, next) => {
    const { name, email, contactNumber, password, address } = req.body

    if(req.body.useDefaultImage === "True"){
        avatar = {
            public_id: 'avatars/default-avatar_uzyujj.png',
            url: 'https://res.cloudinary.com/agiletechnodynamicsinc/image/upload/v1615204943/avatars/default-avatar_uzyujj.png'
        }
    }
    else{
        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 300,
            crop: "scale"
        })
        avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    if(req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match', 400))
    }
    if (req.body.password !== ""){
        if (passVal.validate(req.body.password) !== true){
            return next(new ErrorHandler('Please follow password format', 400))
        }
    }

    const user = await User.create({
        name,
        email,
        password,
        contactNumber,
        address,
        avatar
    })

    res.status(201).json({
        success: true,
        user
    })
})

// Get all users => /api/v1/superadmin/users
exports.allUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find().sort({name: 1})

    const superadminCount = await User.countDocuments({role: 'superadmin'})
    const adminCount = await User.countDocuments({role: 'admin'})

    res.status(200).json({
        success: true,
        users,
        superadminCount,
        adminCount
    })
})

// Get user details  => /api/v1/superadmin/user/:id
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler(`User is not found with id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })
})

//  Update user Profile => /api/v1/superadmin/user/:id
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        contactNumber: req.body.contactNumber,
        address: req.body.address,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData , {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})

// Delete User  => /api/v1/superadmin/user/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler(`User is not found with id: ${req.params.id}`))
    }
    
    await user.remove()

    res.status(200).json({
        success: true,
    })
})

