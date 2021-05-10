const FooterInfo = require('../models/footerInfo')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

// 602d103153535106e4104d3c get footer info => /api/v1/footerinfo
exports.getFooterInfo = catchAsyncErrors (async(req, res,next) =>{
    const footerInfo = await FooterInfo.findById('602d103153535106e4104d3c')

    if(!footerInfo){
        return res.status(404).json({
            success: false,
            message: 'footer info not found'
        })
    }
    
    res.status(200).json({
        success: true,
        footerInfo
    })
})

//update footer info  => /api/v1/admin/updatefooter
exports.updateFooterInfo = catchAsyncErrors (async(req, res,next) =>{
    let footerInfo = await FooterInfo.findById('602d103153535106e4104d3c')

    if(!footerInfo){
        return res.status(404).json({
            success: false,
            message: 'footer info not found'
        })
    }
    
    footerInfo = await FooterInfo.findByIdAndUpdate('602d103153535106e4104d3c', req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        footerInfo
    })
})