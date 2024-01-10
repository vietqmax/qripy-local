const { messageJapan } = require('../../ultils/common')
const db = require('../../models')

let jsPath = 'dashboard'

const index = async (req, res) => {
  try {
    res.render('store/partials/index', {
      jsPath,
      // View
      content: 'dashboard/index',
    })
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
    })
  }
}

module.exports = {
  index,
}
