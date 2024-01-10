const express = require('express')

const router = express.Router()

const { storeAuthVerify, langValidate } = require('../../middleware/auth')
// const storeValidator = require('../../middleware/validators/admin/store.validator')
const { relatedDishListView, relatedDishCreateView } = require('../../controllers/store/relatedDishes.controller')

router.get('/related-dish', [storeAuthVerify, langValidate], relatedDishListView)
// router.get('/store/list', adminAuthVerify, listStore)
// router.post('/store', adminAuthVerify, storeValidator.create, createStore)
router.get('/related-dish/create', [storeAuthVerify, langValidate], relatedDishCreateView)
// router.get('/store/:id', adminAuthVerify, storeEditView)
// router.put('/store/:id', adminAuthVerify, storeValidator.edit, editStore)
// router.delete('/store/:id', adminAuthVerify, deleteStore)

module.exports = router
