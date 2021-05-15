const About = require('../models/about')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const ErrorHandler = require('../utils/errorHandler')

// get all about us details  => /api/v1/allaboutus
exports.getAllAbout = catchAsyncErrors (async(req,res,next) => {
    const abouts = await About.find()

    const aboutCompany_id = await About.findById('602905af513578177431461d')
    const aboutObjectives_id = await About.findById('602905c9513578177431461e')
    const aboutScope_id = await About.findById('602905d6513578177431461f')
    const aboutMission_id = await About.findById('602905e55135781774314620')
    const aboutVision_id = await About.findById('602905ed5135781774314621')
    const aboutHistory_id = await About.findById('602905f65135781774314622')

    const aboutCompany_title = aboutCompany_id.title
    const aboutCompany_description = aboutCompany_id.description

    const aboutObjectives_title = aboutObjectives_id.title
    const aboutObjectives_description = aboutObjectives_id.description

    const aboutScope_title = aboutScope_id.title
    const aboutScope_description = aboutScope_id.description

    const aboutMission_title = aboutMission_id.title
    const aboutMission_description = aboutMission_id.description

    const aboutVision_title = aboutVision_id.title
    const aboutVision_description = aboutVision_id.description

    const aboutHistory_title = aboutHistory_id.title
    const aboutHistory_description = aboutHistory_id.description

    res.status(200).json({
        success: true,
        abouts,
        aboutCompany_title,
        aboutCompany_description,
        aboutObjectives_title,
        aboutObjectives_description,
        aboutScope_title,
        aboutScope_description,
        aboutMission_title,
        aboutMission_description,
        aboutVision_title,
        aboutVision_description,
        aboutHistory_title,
        aboutHistory_description,

    })
})

// get single about us details => /api/v1/about/:id
exports.getSingleAbout = catchAsyncErrors (async(req,res,next) => {
    const about = await About.findById(req.params.id)

    if(!about){
        return next(new ErrorHandler('About us details Not Found', 404))
    }

    res.status(200).json({
        success:true,
        about
    })
})

// update single about us details => /api/v1/about/:id
exports.updateAbout = catchAsyncErrors (async( req, res, next) =>{
    let about = await About.findById(req.params.id)

    if(!about){
        return next(new ErrorHandler('About us details Not Found', 404))
    }

    about = await About.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    
    res.status(200).json({
        success:true,
        about
    })
})