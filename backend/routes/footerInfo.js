const express = require('express')
const router = express.Router()

const { getFooterInfo, updateFooterInfo } = require('../controllers/footerInfoController')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

//router.route('/newfooterinfo').post(newFooterInfo)
router.route('/footerinfo').get(getFooterInfo)
router.route('/admin/updatefooterinfo').put(isAuthenticatedUser,authorizeRoles('admin', 'superadmin'),updateFooterInfo)

module.exports = router