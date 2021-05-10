const express = require('express')
const router = express.Router()

const { newInquiry, getSingleInquiry, getAllInquiries, updateInquiryStatus, deleteSingleInquiry } = require('../controllers/inquiryController')

const { isAuthenticatedUser, authorizeRoles } =  require('../middlewares/auth')

router.route('/inquiry/new').post(newInquiry)

router.route('/admin/inquiry/:id').get(isAuthenticatedUser, authorizeRoles('admin'), getSingleInquiry)
router.route('/admin/inquiries').get(isAuthenticatedUser, authorizeRoles('admin'), getAllInquiries)
router.route('/admin/inquiry/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateInquiryStatus)
router.route('/admin/inquiry/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteSingleInquiry)

module.exports = router