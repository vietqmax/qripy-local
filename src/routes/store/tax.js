const express = require('express')

const router = express.Router()

const { storeAuthVerify, langValidate } = require('../../middleware/auth')
const { taxListView } = require('../../controllers/store/tax.controller')

router.get('/tax-settings', [storeAuthVerify, langValidate], taxListView)

module.exports = router
