const { validationResult } = require('express-validator')
const { messageJapan } = require('../../ultils/common')
const jwToken = require('../../ultils/jwToken')
const db = require('../../models')

const loginView = async (req, res) => {
  res.render('store/auth', {
    appTitle: 'Store',
  })
}
const loginStore = async (req, res) => {
  try {
    const { errors } = validationResult(req)
    if (errors.length > 0) {
      return res.status(422).json({
        title: messageJapan.notification,
        messages: errors,
      })
    }
    const storeInfo = await db.Store.findOne({
      where: { email: req.body.email },
      attributes: ['id', 'name', 'native_language_code', 'other_language', 'is_translate'],
      raw: true,
    })
    const lang = storeInfo.native_language_code
    let other_language = storeInfo.other_language
    let all_language = [lang]
    if (other_language) {
      other_language = other_language.split(';')
      all_language = [lang, ...other_language]
    }
    const is_translate = storeInfo.is_translate
    const storeToken = jwToken.sign(
      {
        id: storeInfo.id,
        name: storeInfo.name,
        lang,
        other_language,
        all_language,
        is_translate,
      },
      1000 * 60 * 60 * 12
    )
    res.cookie('qripy_store', storeToken)
    return res.status(200).json({
      title: messageJapan.notification,
      message: messageJapan.createSuccess,
      url: `store/${storeInfo.native_language_code}/dashboard`,
    })
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err.message,
    })
  }
}
const logout = (req, res) => {
  res.clearCookie('qripy_store')
  return res.redirect(`/store/auth`)
}

module.exports = {
  loginView,
  loginStore,
  logout,
}
