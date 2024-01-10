const express = require('express')

const router = express.Router()

const { storeAuthVerify, langValidate } = require('../../middleware/auth')
const storeDashboardController = require('../../controllers/store/dashboard.controller')

router.get('/dashboard', [storeAuthVerify, langValidate], storeDashboardController.index)

module.exports = router
