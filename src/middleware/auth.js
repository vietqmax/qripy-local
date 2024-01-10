const jwToken = require('../ultils/jwToken')
const db = require('../models')
// Admin
const adminAuthVerify = async (req, res, next) => {
  const token = req.cookies.qripy_admin
  if (!token) {
    console.log('Access token not found')
    return res.redirect('/admin/auth')
  }

  jwToken.verify(token, (err, decoded) => {
    const admin = decoded
    if (err) {
      console.log('You do not have access to this feature')
      return res.redirect('/admin/auth')
    }
    res.locals.auth = { admin }
    next()
  })
}
const adminRedirectVerify = (req, res, next) => {
  jwToken.verify(req.cookies.qripy_admin, (err, payload) => {
    if (payload) {
      return res.redirect(301, '/admin/store')
    }
    next()
  })
}

// Store
const storeAuthVerify = async (req, res, next) => {
  const token = req.cookies.qripy_store
  if (!token) {
    console.log('Access token not found')
    return res.redirect('/store/auth')
  }

  jwToken.verify(token, (err, decoded) => {
    const store = decoded
    if (err) {
      console.log('You do not have access to this feature')
      return res.redirect('/store/auth')
    }
    res.locals.auth = { store }
    next()
  })
}
const storeRedirectVerify = (req, res, next) => {
  jwToken.verify(req.cookies.qripy_store, (err, payload) => {
    if (payload) {
      return res.redirect(301, `/store/${payload.lang}/dashboard`)
    }
    next()
  })
}
const langValidate = (req, res, next) => {
  const { originalUrl } = req
  const nativeLanguageCode = res.locals.auth.store.lang
  const lang = originalUrl.split('/')[2]
  const langArr = res.locals.auth.store.all_language
  if (!langArr) {
    res.redirect('/store/auth/logout')
  }
  if (langArr && !langArr.includes(lang)) {
    res.redirect(`/store/${nativeLanguageCode}/dashboard`)
  }
  next()
}

module.exports = {
  adminAuthVerify,
  adminRedirectVerify,
  storeAuthVerify,
  storeRedirectVerify,
  langValidate,
}
