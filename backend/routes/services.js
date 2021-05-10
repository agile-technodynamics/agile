const express = require('express')
const router = express.Router()

const{ getAllServices, getSingleService, updateService } = require('../controllers/servicesController')

const { isAuthenticatedUser, authorizeRoles } =  require('../middlewares/auth')

router.route('/services').get(getAllServices)
router.route('/service/:id').get(getSingleService)
router.route('/admin/service/:id').put(isAuthenticatedUser,authorizeRoles('admin', 'superadmin'), updateService)


module.exports = router