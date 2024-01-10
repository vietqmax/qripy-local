let jsPath = 'cashiers/dishes'

const index = async (req, res) => {
  try {
    res.render('cashiers/partials/index', {
      jsPath,
      // View
      content: 'dishes/index',
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
