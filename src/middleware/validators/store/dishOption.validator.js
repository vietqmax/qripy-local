const { body } = require('express-validator')

const storeDishOptionValidator = {
  create: [
    body(`dish_option_name`)
      .notEmpty()
      .withMessage({ i18nLabel: 'store_page_dish_option_name', i18nMessage: 'validation_required' }),
    body('dish_option_name_display')
      .notEmpty()
      .withMessage({ i18nLabel: 'store_page_dish_option_name_display', i18nMessage: 'validation_required' }),
    body('items').exists().withMessage({ i18nLabel: 'store_page_dish_option_choices', i18nMessage: 'validation_required' }),
  ],

  edit: [
    body('dish_option_name')
      .notEmpty()
      .withMessage({ i18nLabel: 'store_page_dish_option_name', i18nMessage: 'validation_required' }),
    body('dish_option_name_display')
      .notEmpty()
      .withMessage({ i18nLabel: 'store_page_dish_option_name_display', i18nMessage: 'validation_required' }),
    body('items').exists().withMessage({ i18nLabel: 'store_page_dish_option_choices', i18nMessage: 'validation_required' }),
  ],
}

module.exports = storeDishOptionValidator
