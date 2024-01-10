const express = require('express')

const router = express.Router()

const { storeRedirectVerify, storeAuthVerify } = require('../../middleware/auth')
const storeAuthValidator = require('../../middleware/validators/store/auth.validator')
const storeAuthController = require('../../controllers/store/auth.controller')

router.get('/auth', storeRedirectVerify, storeAuthController.loginView)
router.post('/auth', storeAuthValidator.login, storeAuthController.loginStore)
router.get('/auth/logout', storeAuthController.logout)

module.exports = router
