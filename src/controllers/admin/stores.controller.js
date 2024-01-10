require('dotenv').config()
const { validationResult } = require('express-validator')
const jwToken = require('../../ultils/jwToken')
const { messageJapan } = require('../../ultils/common')
const { Op } = require('sequelize')
const { regions } = require('../../middleware/region')
const db = require('../../models')
const bcryptjs = require('bcryptjs')
const paginate = require('express-paginate')

const env = process.env.NODE_ENV
const config = require('../../config/config')[env]

let jsPath = 'stores'

const storeListView = async (req, res) => {
  try {
    res.render('admin/partials/index', {
      // View
      content: 'stores/index',
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

const storeCreateView = async (req, res) => {
  try {
    res.render('admin/partials/index', {
      // View
      content: 'stores/create',
      jsPath,
      regions: regions(),
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

const createStore = async (req, res) => {
  try {
    const { errors } = validationResult(req)
    if (errors.length > 0) {
      return res.status(422).json({
        status: false,
        title: messageJapan.notification,
        messages: errors,
      })
    }

    let dataUser = req.body
    dataUser.password = bcryptjs.hashSync(dataUser.password, 10)
    dataUser.is_translate = dataUser.is_translate === 'on' ? true : false

    await db.Store.create(dataUser)
    return res.status(201).json({ title: messageJapan.notification, message: messageJapan.createSuccess })
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    })
  }
}

const listStore = async (req, res) => {
  const { page, limit, name } = req.query
  const optionFilter = {}
  if (name) {
    optionFilter.name = { [Op.like]: `%${name}%` }
  }
  const stores = await db.Store.findAndCountAll({
    where: optionFilter,
    limit: limit,
    offset: req.skip,
  })

  if (stores.length == 0) {
    res.status(404).json({
      status: false,
      message: messageJapan.dataNotFound,
    })
    return
  }

  const storesData = stores.rows.map(async (store) => {
    return {
      id: store?.id,
      name: store?.name,
      phone: store?.phone,
      country: store?.country_name,
    }
  })

  const itemCount = stores.count
  const pageCount = Math.ceil(stores.count / limit)
  const currentPage = page
  const getStoreList = await Promise.all(storesData)

  const dataResponse = {
    items: getStoreList,
    path: '/admin/store/list?page=',
    pageCount,
    itemCount,
    currentPage,
    is_more: paginate.hasNextPages(req)(pageCount),
    is_previous: page > 1,
    next_url: paginate.hasNextPages(req)(pageCount) ? paginate.href(req)(currentPage) : '',
    previous_url: page > 1 ? paginate.href(req)({ page: currentPage - 1 }) : '',
    pages: paginate.getArrayPages(req)(3, pageCount, page),
  }
  return res.status(200).json(dataResponse)
}

const storeEditView = async (req, res) => {
  try {
    const { id } = req.params
    const store = await db.Store.findOne({
      where: {
        id: id,
      },
    })

    if (!store) {
      return res.send('404')
    }

    const storeData = {
      id: store?.id,
      name: store?.name,
      phone: store?.phone,
      address: store?.address,
      country_code: store?.country_code,
      country_name: store?.country_name,
      native_language_code: store?.native_language_code,
      timezone: store?.timezone,
      email: store?.email,
      other_language: store?.other_language,
      currency: store?.currency,
      payment_method: store?.payment_method,
      usage_fee: store?.usage_fee,
      is_translate: store?.is_translate,
    }

    res.render('admin/partials/index', {
      // View
      content: 'stores/edit',
      jsPath,
      storeData,
      regions: regions(),
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

const editStore = async (req, res) => {
  try {
    const { id } = req.params
    const { errors } = validationResult(req)
    if (errors.length > 0) {
      return res.status(422).json({
        status: false,
        title: messageJapan.notification,
        messages: errors,
      })
    }
    const store = await db.Store.findOne({
      where: {
        id: id,
      },
    })

    const { password } = req.body
    const dataUser = {
      other_language: store.other_language,
      ...req.body,
    }
    if (password.length > 0) {
      dataUser.password = bcryptjs.hashSync(password, 10)
    } else {
      delete dataUser.password
    }
    await db.Store.update(dataUser, { where: { id: id } })
    return res.status(201).json({ title: messageJapan.notification, message: messageJapan.createSuccess })
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    })
  }
}

const deleteStore = async (req, res) => {
  try {
    const { id } = req.params
    const store = await db.Store.findOne({
      where: {
        id: id,
      },
    })

    if (!store) {
      return res.send('404')
    }

    await db.Store.destroy({ where: { id: id } })
    return res.status(200).json({ title: messageJapan.notification, message: messageJapan.delSuccess })
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
      stack: error.stack,
    })
  }
}

module.exports = {
  storeListView,
  storeCreateView,
  storeEditView,
  createStore,
  listStore,
  editStore,
  deleteStore,
}
