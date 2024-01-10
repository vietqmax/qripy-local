const express = require('express')

const router = express.Router()

const { adminRedirectVerify, adminAuthVerify } = require('../../middleware/auth')
const storeValidator = require('../../middleware/validators/admin/store.validator')
const {
  storeListView,
  storeCreateView,
  createStore,
  listStore,
  storeEditView,
  editStore,
  deleteStore,
} = require('../../controllers/admin/stores.controller')

router.get('/store', adminAuthVerify, storeListView)
router.post('/store', adminAuthVerify, storeValidator.create, createStore)
router.get('/store/create', adminAuthVerify, storeCreateView)
router.get('/store/list', adminAuthVerify, listStore)
router.get('/store/:id', adminAuthVerify, storeEditView)
router.put('/store/:id', adminAuthVerify, storeValidator.edit, editStore)
router.delete('/store/:id', adminAuthVerify, deleteStore)
module.exports = router
