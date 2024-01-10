const { validationResult } = require('express-validator')
const jwToken = require('../../ultils/jwToken')
const { messageJapan } = require('../../ultils/common')
const db = require('../../models')

const env = process.env.NODE_ENV
const config = require('../../config/config')[env]

const loginView = async (req, res) => {
  res.render('admin/auth', {
    appTitle: 'Admin',
  })
}

const loginAdmin = async (req, res) => {
  try {
    const { errors } = validationResult(req)
    if (errors.length > 0) {
      return res.status(422).json({
        title: messageJapan.notification,
        messages: errors,
      })
    }
    const adminInfo = await db.Admin.findOne({
      where: { username: req.body.username },
      attributes: ['id'],
    })
    const adminToken = jwToken.sign(
      {
        id: adminInfo.id,
      },
      1000 * 60 * 60 * 12
    )
    res.cookie('qripy_admin', adminToken)
    return res.status(200).json({
      title: messageJapan.notification,
      message: messageJapan.createSuccess,
    })
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err.message,
    })
  }
}
const logout = (req, res) => {
  res.clearCookie('qripy_admin')
  return res.redirect(`/admin/auth`)
}
module.exports = {
  loginView,
  loginAdmin,
  logout,
}
