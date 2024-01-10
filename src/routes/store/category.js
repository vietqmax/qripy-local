const express = require('express')

const router = express.Router()

const { storeAuthVerify, langValidate } = require('../../middleware/auth')
// const storeValidator = require('../../middleware/validators/admin/store.validator')
const { categoryListView, categoryCreateView } = require('../../controllers/store/categories.controller')

router.get('/category', [storeAuthVerify, langValidate], categoryListView)
// router.get('/store/list', adminAuthVerify, listStore)
// router.post('/store', adminAuthVerify, storeValidator.create, createStore)
router.get('/category/create', [storeAuthVerify, langValidate], categoryCreateView)
// router.get('/store/:id', adminAuthVerify, storeEditView)
// router.put('/store/:id', adminAuthVerify, storeValidator.edit, editStore)
// router.delete('/store/:id', adminAuthVerify, deleteStore)

module.exports = router
