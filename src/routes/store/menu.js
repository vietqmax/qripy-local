const express = require('express')

const router = express.Router()

const { storeAuthVerify, langValidate } = require('../../middleware/auth')
const { menuListView, menuCreateView, menuDisplayTimeView } = require('../../controllers/store/menus.controller')

router.get('/menu', [storeAuthVerify, langValidate], menuListView)
router.get('/menu/create', [storeAuthVerify, langValidate], menuCreateView)
router.get('/menu/display-time', [storeAuthVerify, langValidate], menuDisplayTimeView)

module.exports = router
