const Home = require('../models/home')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const cloudinary = require('cloudinary')

// get all home page details => /api/v1/homes
exports.getAllHomePage = catchAsyncErrors (async(req,res,next) => {
    const homes = await Home.find()
    
    const productsDescription_id = await Home.findById("603903953edb720c5176611a")
    const servicesDescription_id = await Home.findById("603903963edb720c5176611b")
    const prodImgLeft_id = await Home.findById("603903af3edb720c5176611c")
    const prodImgRight_id = await Home.findById("603903b53edb720c5176611d")
    const titleBackground_id = await Home.findById("603903ce3edb720c5176611e")
    const servicesBackground_id = await Home.findById("603903f33edb720c5176611f")

    const productsDescription = productsDescription_id.description
    const servicesDescription = servicesDescription_id.description
    const productImageLeft = prodImgLeft_id.image.url
    const productImageRight = prodImgRight_id.image.url
    const titleBackground = titleBackground_id.image.url
    const servicesBackground = servicesBackground_id.image.url

    res.status(200).json({
        success: true,
        homes,
        productsDescription,
        servicesDescription,
        productImageLeft,
        productImageRight,
        titleBackground,
        servicesBackground
    })
})

// get single homepage details => /api/v1/home/:id
exports.getHomePage = catchAsyncErrors (async(req, res,next) =>{
    const home = await Home.findById(req.params.id)

    if(!home){
        return res.status(404).json({
            success: false,
            message: 'Home details not found'
        })
    }

    res.status(200).json({
        success: true,
        home
    })
})

  // update homepage details => /api/v1/admin/home/:id
exports.updateHomePage = catchAsyncErrors (async(req,res,next)=>{
    let home = await Home.findById(req.params.id)

    if(!home){
        return res.status(404).json({
            success: false,
            message: 'homepage not found'
        })
    }

    const newHomeData = { //remove this to update in postman
        name: req.body.name,
        description: req.body.description
    }

    if(req.body.image !== '') {
        const image_id = home.image.public_id

        const res = await cloudinary.v2.uploader.destroy(image_id)

        const result = await cloudinary.v2.uploader.upload(req.body.image, {
            folder: 'websiteImages',
            crop: 'scale'
        })

        newHomeData.image = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }
    
    home = await Home.findByIdAndUpdate(req.params.id, newHomeData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        home
    })
})