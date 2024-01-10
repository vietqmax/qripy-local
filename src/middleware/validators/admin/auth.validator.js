const { body } = require('express-validator')
const bcryptjs = require('bcryptjs')
const { messageValidation } = require('../../../ultils/common')
const db = require('../../../models')

const checkInfo = async (password, req) => {
  const adminInfo = await db.Admin.findOne({ where: { username: req.body.username } })
  if (!adminInfo) {
    throw new Error(messageValidation.unauthenticated)
  }
  const isPwMatched = await bcryptjs.compare(password, adminInfo.password)
  if (!isPwMatched) {
    throw new Error(messageValidation.unauthenticated)
  }
}

const adminAuthValidator = {
  login: [
    body('username').notEmpty().withMessage(`ユーザー名${messageValidation.empty}`),

    body('password')
      .notEmpty()
      .withMessage(`パスワード${messageValidation.empty}`)
      .bail()
      .custom(async (password, { req }) => checkInfo(password, req)),
  ],
}

module.exports = adminAuthValidator
