const express = require('express')

const router = express.Router()

const { storeAuthVerify, langValidate } = require('../../middleware/auth')
const { index } = require('../../controllers/cashier/dashboard.controller')

router.get('/dashboard', [storeAuthVerify, langValidate], index)

module.exports = router
