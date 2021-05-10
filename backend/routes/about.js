const express = require('express')
const router = express.Router()

const{ getAllAbout, getSingleAbout, updateAbout } = require('../controllers/aboutController')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/abouts').get(getAllAbout)
router.route('/about/:id').get(getSingleAbout)
router.route('/admin/about/:id').put(isAuthenticatedUser,authorizeRoles('admin', 'superadmin'),updateAbout)

module.exports = router