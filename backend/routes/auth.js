const express = require ('express')
const router = express.Router()

const { registerUser,
        accessLogin, 
        loginUser, 
        logout, 
        forgotPassword, 
        resetPassword, 
        getUserProfile, 
        updatePassword, 
        updateProfile, 
        allUsers, 
        getUserDetails, 
        updateUser, 
        deleteUser } = require('../controllers/authController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/access').get(accessLogin)
router.route('/login').post(loginUser)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/logout').get(logout)

router.route('/me').get(isAuthenticatedUser, getUserProfile)
router.route('/password/update').put(isAuthenticatedUser, updatePassword)
router.route('/me/update').put(isAuthenticatedUser, updateProfile)

// Superadmin roles
router.route('/superadmin/register').post(isAuthenticatedUser, authorizeRoles('superadmin'),registerUser)
router.route('/superadmin/users').get(isAuthenticatedUser, authorizeRoles('superadmin'), allUsers)
router.route('/superadmin/user/:id').get(isAuthenticatedUser, authorizeRoles('superadmin'), getUserDetails)
router.route('/superadmin/user/:id').put(isAuthenticatedUser, authorizeRoles('superadmin'), updateUser)
router.route('/superadmin/user/:id').delete(isAuthenticatedUser, authorizeRoles('superadmin'), deleteUser)

module.exports = router