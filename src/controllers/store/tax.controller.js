require('dotenv').config()
const { validationResult } = require('express-validator')
const { messageJapan } = require('../../ultils/common')
const { googleTranslates } = require('../../apis/translate')
const { Op } = require('sequelize')
const db = require('../../models')
const paginate = require('express-paginate')

let jsPath = 'taxes'

const taxListView = async (req, res) => {
  try {
    res.render('store/partials/index', {
      // View
      content: 'taxes/index',
      jsPath,
      // Ultils
      messageJapan,
    })
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
    })
  }
}

module.exports = {
  taxListView,
}
