const express = require('express')
const router = express.Router()

const{ getAllProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, getAdminProducts } = require('../controllers/productController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/products').get(getAllProducts)
router.route('/product/:id').get(getSingleProduct)

// Admin Roles
router.route('/admin/products').get(isAuthenticatedUser,authorizeRoles('admin'), getAdminProducts)
router.route('/admin/product/new').post(isAuthenticatedUser,authorizeRoles('admin'), newProduct)
router.route('/admin/product/:id').put(isAuthenticatedUser,authorizeRoles('admin'), updateProduct)
router.route('/admin/product/:id').delete(isAuthenticatedUser,authorizeRoles('admin'), deleteProduct)

module.exports = router