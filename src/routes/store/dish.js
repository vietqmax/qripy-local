const express = require('express')

const router = express.Router()

const { storeAuthVerify, langValidate } = require('../../middleware/auth')
const { dishListView, dishCreateView } = require('../../controllers/store/dishes.controller')

router.get('/dish', [storeAuthVerify, langValidate], dishListView)
router.get('/dish/create', [storeAuthVerify, langValidate], dishCreateView)

module.exports = router
