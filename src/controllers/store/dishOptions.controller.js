require('dotenv').config()
const { validationResult } = require('express-validator')
const { groupValidation } = require('../../ultils/common')
const { Op } = require('sequelize')
const db = require('../../models')
const paginate = require('express-paginate')
const { uploader, viewImage } = require('../../middleware/upload')

const env = process.env.NODE_ENV
const config = require('../../config/config')[env]

let jsPath = 'dishOptions'

const dishOptionListView = async (req, res) => {
  try {
    res.render('store/partials/index', {
      // View
      content: 'dishOptions/index',
      jsPath,
    })
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
    })
  }
}

const dishOptionList = async (req, res) => {
  // const { page, limit } = req.query
  const store = res.locals.auth.store
  const dishOptions = await db.DishOption.findAndCountAll({
    include: [
      {
        model: db.DishOptionTranslate,
        attributes: ['name'],
        as: 'DishOptionTranslates',
        where: { language_code: res.locals.lang },
      },
    ],
    where: { store_id: store.id },
    // limit: limit,
    // offset: req.skip,
    order: [
      ['sort_order', 'ASC'],
      ['created_at', 'DESC'],
    ],
    raw: true,
  })
  if (dishOptions.count == 0) {
    return res.status(404).json({
      status: false,
      message: res.__('message_data_not_found'),
    })
  }

  const textTranslate = {
    btnEdit: res.__('store_page_dish_option_btn_edit'),
    btnDelete: res.__('store_page_dish_option_btn_delete'),
    notificationTitle: res.__('message_notification'),
    notificationText: res.__('message_del_warning'),
    btnConfirm: res.__('btn_confirm'),
    btnCancel: res.__('btn_cancel'),
  }

  const dishOptionsData = await Promise.all(
    dishOptions.rows.map(async (dishOption) => {
      return {
        id: dishOption?.id,
        sort_order: dishOption?.sort_order,
        name: dishOption?.['DishOptionTranslates.name'],
      }
    })
  )

  // const itemCount = dishOptions.count
  // const pageCount = Math.ceil(dishOptions.count / limit)
  // const currentPage = page

  const dataResponse = {
    items: dishOptionsData,
    textTranslate,
    path: `/store/${res.locals.lang}/dish-option/list?page=`,
    // pageCount,
    // itemCount,
    // currentPage,
    // is_more: paginate.hasNextPages(req)(pageCount),
    // is_previous: page > 1,
    // next_url: paginate.hasNextPages(req)(pageCount) ? paginate.href(req)(currentPage) : '',
    // previous_url: page > 1 ? paginate.href(req)({ page: currentPage - 1 }) : '',
    // pages: paginate.getArrayPages(req)(3, pageCount, page),
  }
  return res.status(200).json(dataResponse)
}

const dishOptionSortOrder = async (req, res) => {
  try {
    const store = res.locals.auth.store
    const { dishOptions } = req.body
    // Update dish option sort order
    for (const dishOptionId in dishOptions) {
      const dishOptionIndex = dishOptions[dishOptionId]
      await db.DishOption.update({ sort_order: dishOptionIndex }, { where: { id: dishOptionId, store_id: store.id } })
    }
    return res.status(200).json({ title: res.__('message_notification'), message: res.__('message_update_success') })
  } catch (error) {
    res.status(400).json({
      status: false,
      message: res.__('message_update_fail'),
    })
  }
}

const dishOptionCreateView = async (req, res) => {
  try {
    res.render('store/partials/index', {
      // View
      content: 'dishOptions/create',
      jsPath,
    })
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err.message,
    })
  }
}

const dishOptionCreate = async (req, res) => {
  try {
    const { errors } = validationResult(req)
    if (errors.length > 0) {
      return res.status(422).json({
        status: false,
        errors: groupValidation(errors, res),
      })
    }
    const store = res.locals.auth.store
    const dataCreate = req.body
    const dishOptionNames = dataCreate.dish_option_name
    const dishOptionNameDisplays = dataCreate.dish_option_name_display
    const items = dataCreate.items
    // Create dish option
    const dishOption = await db.DishOption.create({ store_id: store.id, display: dataCreate.display })
    // Create dish option translate
    for (const langCode in dishOptionNames) {
      const dishOptionName = dishOptionNames[langCode]
      const dishOptionNameDisplay = dishOptionNameDisplays[langCode]
      let type = 'option'
      if (langCode === store.lang) {
        type = 'main'
      }
      await db.DishOptionTranslate.create({
        store_id: store.id,
        dish_option_id: dishOption.id,
        name: dishOptionName,
        label: dishOptionNameDisplay,
        language_code: langCode,
        type: type,
      })
    }
    // Create dish option item
    items.forEach(async (item, index) => {
      const dishOptionItem = await db.DishOptionItem.create({
        store_id: store.id,
        dish_option_id: dishOption.id,
        img: item.img === '' ? null : item.img,
        sort_order: index,
      })
      const itemNames = item.text
      for (const langCode in itemNames) {
        const itemName = itemNames[langCode]
        let type = 'option'
        if (langCode === store.lang) {
          type = 'main'
        }
        await db.DishOptionItemTranslate.create({
          store_id: store.id,
          dish_option_id: dishOption.id,
          dish_option_item_id: dishOptionItem.id,
          name: itemName,
          language_code: langCode,
          type: type,
        })
      }
    })
    return res.status(200).json({ title: res.__('message_notification'), message: res.__('message_create_success') })
  } catch (error) {
    res.status(400).json({
      status: false,
      message: res.__('message_error_translate'), //error.message
    })
  }
}

const dishOptionEditView = async (req, res) => {
  try {
    const { id } = req.params
    const store = res.locals.auth.store
    const dishOption = await db.DishOption.findOne({
      include: [
        {
          model: db.DishOptionTranslate,
          attributes: ['id', 'name', 'label', 'language_code', 'type'],
          as: 'DishOptionTranslates',
          separate: true,
          order: [
            ['type', 'ASC'],
            ['language_code', 'ASC'],
          ],
        },
      ],
      where: { id: id, store_id: store.id },
      attributes: ['id', 'store_id', 'display'],
    })
    const dishOptionItems = await db.DishOptionItem.findAndCountAll({
      include: [
        {
          model: db.DishOptionItemTranslate,
          attributes: ['id', 'name', 'language_code', 'type'],
          as: 'DishOptionItemTranslates',
          separate: true,
          order: [
            ['type', 'ASC'],
            ['language_code', 'ASC'],
          ],
        },
      ],
      where: { store_id: store.id, dish_option_id: dishOption.id },
      attributes: ['id', 'img'],
      order: [
        ['sort_order', 'ASC'],
        ['created_at', 'DESC'],
      ],
    })

    if (!dishOption || !dishOptionItems) {
      return res.send('404')
    }

    const dishOptionData = {
      id: dishOption?.id,
      store_id: dishOption?.store_id,
      display: dishOption?.display,
      DishOptionTranslates: Object.fromEntries(
        dishOption?.DishOptionTranslates.map((translate) => [
          translate.language_code,
          {
            id: translate.id,
            name: translate.name,
            label: translate.label,
            language_code: translate.language_code,
            type: translate.type,
          },
        ])
      ),
      items: dishOptionItems.rows.map((item) => ({
        id: item?.id,
        img: item?.img,
        DishOptionItemTranslates: Object.fromEntries(
          item?.DishOptionItemTranslates.map((translate) => [
            translate.language_code,
            {
              id: translate.id,
              name: translate.name,
              language_code: translate.language_code,
              type: translate.type,
            },
          ])
        ),
      })),
    }
    res.render('store/partials/index', {
      // View
      content: 'dishOptions/edit',
      jsPath,
      dishOptionData,
    })
  } catch (err) {
    res.redirect(`${res.locals.appUrl}/store/${res.locals.lang}/dish-option`)
  }
}

const dishOptionEdit = async (req, res) => {
  try {
    const { id } = req.params
    const { errors } = validationResult(req)
    if (errors.length > 0) {
      return res.status(422).json({
        status: false,
        errors: groupValidation(errors, res),
      })
    }
    const store = res.locals.auth.store
    const dataEdit = req.body
    const dishOptionNames = dataEdit.dish_option_name
    const dishOptionNameDisplays = dataEdit.dish_option_name_display
    const items = dataEdit.items
    // Update dish option
    await db.DishOption.update({ display: dataEdit.display }, { where: { id: id, store_id: store.id } })
    // Update dish option translate
    for (const langCode in dishOptionNames) {
      const dishOptionName = dishOptionNames[langCode]
      const dishOptionNameDisplay = dishOptionNameDisplays[langCode]
      await db.DishOptionTranslate.update(
        { name: dishOptionName, label: dishOptionNameDisplay },
        { where: { store_id: store.id, dish_option_id: id, language_code: langCode } }
      )
    }
    // Update dish option item
    items.forEach(async (item, index) => {
      if ('id' in item && 'translateId' in item) {
        if ('deleteId' in item) {
          // Delete
          await db.DishOptionItem.destroy({ where: { id: item.id, store_id: store.id } })
          await db.DishOptionItemTranslate.destroy({ where: { store_id: store.id, dish_option_item_id: item.id } })
        } else {
          // Update
          await db.DishOptionItem.update(
            { img: item.img === '' ? null : item.img, sort_order: index },
            { where: { id: item.id, store_id: store.id } }
          )
          const itemNames = item.text
          const itemIds = item.translateId
          for (const langCode in itemNames) {
            const itemName = itemNames[langCode]
            const itemId = itemIds[langCode]
            await db.DishOptionItemTranslate.update({ name: itemName }, { where: { id: itemId, store_id: store.id } })
          }
        }
      } else {
        // Create
        const dishOptionItem = await db.DishOptionItem.create({
          store_id: store.id,
          dish_option_id: id,
          img: item.img === '' ? null : item.img,
          sort_order: index,
        })
        const itemNames = item.text
        for (const langCode in itemNames) {
          const itemName = itemNames[langCode]
          let type = 'option'
          if (langCode === store.lang) {
            type = 'main'
          }
          await db.DishOptionItemTranslate.create({
            store_id: store.id,
            dish_option_id: id,
            dish_option_item_id: dishOptionItem.id,
            name: itemName,
            language_code: langCode,
            type: type,
          })
        }
      }
    })
    return res.status(200).json({ title: res.__('message_notification'), message: res.__('message_update_success'), id: id })
  } catch (error) {
    res.status(400).json({
      status: false,
      message: res.__('message_error_translate'), //error.message
    })
  }
}

const dishOptionDelete = async (req, res) => {
  try {
    const { id } = req.params
    const store = res.locals.auth.store
    const dishOption = await db.DishOption.findOne({ where: { id: id, store_id: store.id } })

    if (!dishOption) {
      return res.send('404')
    }

    await db.DishOption.destroy({ where: { id: id, store_id: store.id } })
    await db.DishOptionTranslate.destroy({ where: { store_id: store.id, dish_option_id: id } })
    await db.DishOptionItem.destroy({ where: { store_id: store.id, dish_option_id: id } })
    await db.DishOptionItemTranslate.destroy({ where: { store_id: store.id, dish_option_id: id } })

    return res.status(200).json({ title: res.__('message_notification'), message: res.__('message_del_success') })
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
      stack: error.stack,
    })
  }
}

const dishOptionValidationItemTranslate = async (req, res) => {
  try {
    const { errors } = validationResult(req)
    if (errors.length > 0) {
      return res.status(422).json({
        status: false,
        errors: errors,
        message: res.__('validation_required'),
      })
    }
    return res.status(200).json({ title: res.__('message_notification'), message: 'Success' })
  } catch (error) {
    res.status(400).json({
      status: false,
      message: res.__('message_error_translate'), //error.message
    })
  }
}

// Upload Img
const uploadImg = async (req, res) => {
  try {
    const img = await uploader(req.file, 'dish-option')
    return res.status(200).json({
      key: img,
      path: await viewImage(img),
    })
  } catch (err) {
    res.status(400).json({
      status: false,
      stack: err.stack,
      message: err.message,
    })
  }
}

module.exports = {
  dishOptionListView,
  dishOptionList,
  dishOptionSortOrder,
  dishOptionCreateView,
  dishOptionCreate,
  dishOptionEditView,
  dishOptionEdit,
  dishOptionValidationItemTranslate,
  dishOptionDelete,
  uploadImg,
}
