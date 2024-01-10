const express = require('express')

const router = express.Router()

const { storeAuthVerify, langValidate } = require('../../middleware/auth')
const { index } = require('../../controllers/cashier/table.controller')

router.get('/table', [storeAuthVerify, langValidate], index)

module.exports = router
