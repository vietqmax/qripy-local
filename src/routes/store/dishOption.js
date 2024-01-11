const express = require('express')
const { upload } = require('../../ultils/common')

const router = express.Router()

const { storeAuthVerify, langValidate } = require('../../middleware/auth')
const storeDishOptionValidator = require('../../middleware/validators/store/dishOption.validator')
const {
  dishOptionListView,
  dishOptionList,
  dishOptionSortOrder,
  dishOptionCreateView,
  dishOptionCreate,
  dishOptionEditView,
  dishOptionEdit,
  dishOptionDelete,
  uploadImg,
} = require('../../controllers/store/dishOptions.controller')

router.get('/dish-option', [storeAuthVerify, langValidate], dishOptionListView)
router.get('/dish-option/list', [storeAuthVerify, langValidate], dishOptionList)
router.put('/dish-option/sort-order', [storeAuthVerify, langValidate], dishOptionSortOrder)
router.get('/dish-option/create', [storeAuthVerify, langValidate], dishOptionCreateView)
router.post('/dish-option/create', [storeAuthVerify, langValidate, storeDishOptionValidator.create], dishOptionCreate)
router.get('/dish-option/:id', [storeAuthVerify, langValidate], dishOptionEditView)
router.put('/dish-option/:id', [storeAuthVerify, langValidate, storeDishOptionValidator.edit], dishOptionEdit)
router.delete('/dish-option/:id', [storeAuthVerify, langValidate], dishOptionDelete)
// Upload img
router.post('/dish-option/upload-img', [storeAuthVerify, upload.single('img')], uploadImg)

module.exports = router
