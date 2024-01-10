const { body } = require('express-validator')
const bcryptjs = require('bcryptjs')
const { messageValidation } = require('../../../ultils/common')
const db = require('../../../models')

const storeValidator = {
  create: [
    body('email')
      .notEmpty()
      .withMessage(`メールアドレス${messageValidation.empty}`)
      .bail()
      .isEmail()
      .withMessage(`メールアドレス${messageValidation.email}`)
      .bail()
      .custom(async (email) => {
        const result = await db.Store.findOne({ where: { email } })
        if (result) {
          throw new Error(`メールアドレス${messageValidation.existed}`)
        }
      }),
    body('password').notEmpty().withMessage(`パスワード${messageValidation.empty}`),
    body('name').notEmpty().withMessage(`名前${messageValidation.empty}`),
    body('phone').notEmpty().withMessage(`電話番号${messageValidation.empty}`),
    body('address').notEmpty().withMessage(`住所${messageValidation.empty}`),
    body('country_code').notEmpty().withMessage(`国${messageValidation.empty}`),
    body('usage_fee').notEmpty().withMessage(`システム利用料${messageValidation.empty}`),
    body('currency').notEmpty().withMessage(`通貨${messageValidation.empty}`),
    body('timezone').notEmpty().withMessage(`タイムゾーン${messageValidation.empty}`),
  ],

  edit: [
    body('email')
      .notEmpty()
      .withMessage(`メールアドレス${messageValidation.empty}`)
      .bail()
      .isEmail()
      .withMessage(`メールアドレス${messageValidation.email}`)
      .bail()
      .custom(async (email, { req }) => {
        const result = await db.Store.findOne({ where: { email } })
        if (result) {
          const isSameAsOldEmail = await db.Store.findOne({ where: { id: req.params.id, email } })
          if (!isSameAsOldEmail) {
            throw new Error(`メールアドレス${messageValidation.existed}`)
          }
        }
      }),
    body('name').notEmpty().withMessage(`名前${messageValidation.empty}`),
    body('usage_fee').notEmpty().withMessage(`システム利用料${messageValidation.empty}`),
    body('phone').notEmpty().withMessage(`電話番号${messageValidation.empty}`),
    body('address').notEmpty().withMessage(`住所${messageValidation.empty}`),
    // body('country_code').notEmpty().withMessage(`国${messageValidation.empty}`),
    // body('currency').notEmpty().withMessage(`通貨${messageValidation.empty}`),
    // body('timezone').notEmpty().withMessage(`タイムゾーン${messageValidation.empty}`),
    // body('other_language').notEmpty().withMessage(`第二言語${messageValidation.empty}`),
  ],
}

module.exports = storeValidator
