require('dotenv').config()
const { validationResult } = require('express-validator')
const { messageJapan } = require('../../ultils/common')
const { googleTranslates } = require('../../apis/translate')
const { Op } = require('sequelize')
const db = require('../../models')
const paginate = require('express-paginate')

let jsPath = 'menus'

const menuListView = async (req, res) => {
  try {
    res.render('store/partials/index', {
      // View
      content: 'menus/index',
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

const menuCreateView = async (req, res) => {
  try {
    res.render('store/partials/index', {
      // View
      content: 'menus/create',
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

const menuDisplayTimeView = async (req, res) => {
  try {
    res.render('store/partials/index', {
      // View
      content: 'menus/display-time',
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
  menuListView,
  menuCreateView,
  menuDisplayTimeView,
}
