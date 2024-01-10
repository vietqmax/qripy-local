const express = require('express')
const router = express.Router()
const CommonController = require('../controllers/common.controller')
// const authentication = require('../middleware/authentication')
const { storeAuthVerify } = require('../middleware/auth')

router.get('/common/fetch-region', CommonController.fetchRegion)
router.get('/common/translate-text', storeAuthVerify, CommonController.translateText)

module.exports = router
