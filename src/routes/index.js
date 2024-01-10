const welcome = require('../routes/welcome')
const common = require('../routes/common')
const adminAuth = require('./admin/auth')
const adminStore = require('./admin/store')

const storeAuth = require('./store/auth')
const storeDashboard = require('./store/dashboard')
const storeDish = require('./store/dish')
const storeCategory = require('./store/category')
const storeMenu = require('./store/menu')
const storeTax = require('./store/tax')
const storeDishOption = require('./store/dishOption')
const storeRelatedDish = require('./store/relatedDish')

const cashierDashboard = require('./cashier/dashboard')
const cashierKitchen = require('./cashier/kitchen')
const cashierHistory = require('./cashier/history')
const cashierDishes = require('./cashier/dishes')
const cashierTable = require('./cashier/table')

const apiRoutes = (app) => {
  app.use('/admin', adminAuth)
  app.use('/admin', adminStore)

  app.use('/store', storeAuth)
  app.use('/store/:lang', storeDashboard)
  app.use('/store/:lang', storeDish)
  app.use('/store/:lang', storeCategory)
  app.use('/store/:lang', storeMenu)
  app.use('/store/:lang', storeTax)
  app.use('/store/:lang', storeDishOption)
  app.use('/store/:lang', storeRelatedDish)

  app.use('/cashier/:lang', [cashierDashboard, cashierKitchen, cashierHistory, cashierDishes, cashierTable])

  app.use('/', welcome)
  app.use('/', common)
  return app
}

module.exports = apiRoutes
