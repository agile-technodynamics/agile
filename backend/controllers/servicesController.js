const Services = require('../models/services')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const ErrorHandler = require('../utils/errorHandler')

// get all services => /api/v1/services
exports.getAllServices = catchAsyncErrors (async(req,res,next) => {
    const services = await Services.find()

    const it1_id = await Services.findById('603a584d9d25cf2bac76f4c7')
    const it2_id = await Services.findById('603a585a9d25cf2bac76f4c8')
    const etd1_id = await Services.findById('603a58849d25cf2bac76f4c9')
    const et2_id = await Services.findById('603a58999d25cf2bac76f4ca')

    const it1_subtitle = it1_id.subtitle
    const it2_subtitle = it2_id.subtitle
    const etd1_subtitle = etd1_id.subtitle
    const etd2_subtitle = et2_id.subtitle

    const it1_desc = it1_id.description
    const it2_desc = it2_id.description
    const etd1_desc = etd1_id.description
    const etd2_desc = et2_id.description

    const it1_iconBg = it1_id.iconBackground
    const it2_iconBg = it2_id.iconBackground
    const etd1_iconBg = etd1_id.iconBackground
    const etd2_iconBg = et2_id.iconBackground

    const it1_icon = it1_id.icon
    const it2_icon = it2_id.icon
    const etd1_icon = etd1_id.icon
    const etd2_icon = et2_id.icon

    res.status(200).json({
        success: true,
        services,
        it1_subtitle,
        it2_subtitle,
        etd1_subtitle,
        etd2_subtitle,
        it1_icon,
        it2_icon,
        etd1_icon,
        etd2_icon,
        it1_desc,
        it2_desc,
        etd1_desc,
        etd2_desc,
        it1_iconBg,
        it2_iconBg,
        etd1_iconBg,
        etd2_iconBg
    })
})

// get single service => /api/v1/service/:id
exports.getSingleService = catchAsyncErrors (async(req,res,next) => {
    const service = await Services.findById(req.params.id)

    if(!service){
        return next(new ErrorHandler('Service us details Not Found', 404))
    }

    res.status(200).json({
        success:true,
        service
    })
})

// update single service => /api/v1/service/:id
exports.updateService = catchAsyncErrors (async( req, res, next) =>{
    let service = await Services.findById(req.params.id)

    if(!service){
        return next(new ErrorHandler('Services details Not Found', 404))
    }

    service = await Services.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    
    res.status(200).json({
        success:true,
        service
    })
})