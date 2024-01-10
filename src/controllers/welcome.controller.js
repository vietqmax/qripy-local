'use strict'

let welcome = async (req, res) => {
  req.io.emit('hello_id')

  res.render('welcome')
}

module.exports = {
  welcome,
}
