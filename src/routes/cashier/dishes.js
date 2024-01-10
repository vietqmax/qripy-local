const express = require('express')

const router = express.Router()

const { storeAuthVerify, langValidate } = require('../../middleware/auth')
const { index } = require('../../controllers/cashier/dishes.controller')

router.get('/dishes', [storeAuthVerify, langValidate], index)

module.exports = router
