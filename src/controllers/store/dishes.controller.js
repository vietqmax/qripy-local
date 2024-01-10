require('dotenv').config()
const { validationResult } = require('express-validator')
const { messageJapan } = require('../../ultils/common')
const { googleTranslates } = require('../../apis/translate')
const { Op } = require('sequelize')
const db = require('../../models')
const paginate = require('express-paginate')

let jsPath = 'dishes'

const dishListView = async (req, res) => {
  try {
    res.render('store/partials/index', {
      // View
      content: 'dishes/index',
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

const dishCreateView = async (req, res) => {
  try {
    res.render('store/partials/index', {
      // View
      content: 'dishes/create',
      jsPath,
      // Ultils
      messageJapan,
    })
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err.message,
    })
  }
}

module.exports = {
  dishListView,
  dishCreateView,
}
