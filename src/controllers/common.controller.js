const { regions } = require('../middleware/region')
const { googleTranslates } = require('../apis/translate')
const i18n = require('i18n')

const fetchRegion = (req, res) => {
  try {
    const region = regions(req.query.code)
    return res.status(200).json(region)
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    })
  }
}

const translateText = async (req, res) => {
  const source = res.locals.auth.store.lang
  const targets = res.locals.auth.store.other_language
  const langCurrent = req.query.langCurrent
  const text = req.query.text.trim()
  try {
    if (text) {
      const result = await googleTranslates(req.query.text, source, targets)
      if (result?.status !== false) {
        return res.status(200).json({
          status: true,
          message: i18n.__({ phrase: 'message_text_translate_success', locale: langCurrent }),
          data: result.data,
        })
      } else {
        return res.status(400).json({
          status: false,
          message: i18n.__({ phrase: 'message_error_tranalste', locale: langCurrent }),
        })
      }
    } else {
      return res.status(400).json({
        status: false,
        message: i18n.__({ phrase: 'message_text_translate_empty', locale: langCurrent }),
      })
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: i18n.__({ phrase: 'message_error_tranalste', locale: langCurrent }),
    })
  }
}
module.exports = { fetchRegion, translateText }
