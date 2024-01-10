const { body } = require('express-validator')
const bcryptjs = require('bcryptjs')
const { messageValidation } = require('../../../ultils/common')
const db = require('../../../models')

const checkInfo = async (password, req) => {
  const storeInfo = await db.Store.findOne({ where: { email: req.body.email } })
  if (!storeInfo) {
    throw new Error(messageValidation.unauthenticated)
  }
  const isPwMatched = await bcryptjs.compare(password, storeInfo.password)
  if (!isPwMatched) {
    throw new Error(messageValidation.unauthenticated)
  }
}

const storeAuthValidator = {
  login: [
    body('email')
      .notEmpty()
      .withMessage(`メールアドレス${messageValidation.empty}`)
      .bail()
      .isEmail()
      .withMessage(`メールアドレス${messageValidation.email}`),
    body('password')
      .notEmpty()
      .withMessage(`パスワード${messageValidation.empty}`)
      .bail()
      .custom(async (password, { req }) => checkInfo(password, req)),
  ],
}

module.exports = storeAuthValidator
