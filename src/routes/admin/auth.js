const express = require('express')

const router = express.Router()

const { adminRedirectVerify, adminAuthVerify } = require('../../middleware/auth')
const adminAuthValidator = require('../../middleware/validators/admin/auth.validator')
const adminAuthController = require('../../controllers/admin/auth.controller')

router.get('/', async (res, req) => {
  req.redirect('/admin/auth')
})
router.get('/auth', adminRedirectVerify, adminAuthController.loginView)
router.post('/auth', adminAuthValidator.login, adminAuthController.loginAdmin)
router.get('/auth/logout', adminAuthController.logout)

module.exports = router
