const express = require('express')

const router = express.Router()

const { storeAuthVerify, langValidate } = require('../../middleware/auth')
const { index } = require('../../controllers/cashier/kitchen.controller')

router.get('/kitchen', [storeAuthVerify, langValidate], index)

module.exports = router
