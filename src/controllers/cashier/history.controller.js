let jsPath = 'cashiers/history'

const index = async (req, res) => {
  try {
    res.render('cashiers/partials/index', {
      jsPath,
      // View
      content: 'history/index',
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