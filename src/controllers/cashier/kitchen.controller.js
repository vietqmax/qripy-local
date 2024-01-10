let jsPath = 'cashiers/kitchen'

const index = async (req, res) => {
  try {
    res.render('cashiers/partials/index', {
      jsPath,
      // View
      content: 'kitchen/index',
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
