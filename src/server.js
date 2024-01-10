require('dotenv').config()
const express = require('express')
const env = process.env.NODE_ENV
const cors = require('cors')
const path = require('path')
const paginate = require('express-paginate')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const { createServer } = require('http')
const { Server } = require('socket.io')
const config = require('../src/config/config')[env]
const apiRoutes = require('../src/routes/index')
// const privatedRoutes = express.Router()
const i18n = require('i18n')
const ejs = require('ejs')

const port = process.env.PORT
i18n.configure({
  directory: path.join(__dirname, 'locales'),
  updateFiles: false,
  retryInDefaultLocale: false,
  defaultLocale: 'ja',
  queryParameter: 'lang',
  register: global,
})
const app = express()
app.use(cookieParser())

const httpServer = createServer(app)
const io = new Server(httpServer, {
  connectionStateRecovery: {
    // the backup duration of the sessions and the packets
    maxDisconnectionDuration: 2 * 60 * 1000,
    // whether to skip middlewares upon successful recovery
    skipMiddlewares: true,
  },
  rejectUnauthorized: false,
  cors: {
    origin: ['*'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

app.use(paginate.middleware(10, 50))

app.use(express.static(`${__dirname}/public`))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.disable('x-powered-by')

app.use((req, res, next) => {
  res.locals.appUrl = config.appUrl
  res.locals.appUrlPath = config.appUrl + req.path
  res.locals.isLoggedin = !!req.cookies.userToken
  // if (req.cookies.userToken) {
  //   jwToken.verify(req.cookies.userToken, async (err, decoded) => {
  //     const user = decoded
  //     res.locals.userId = user.id
  //   })
  // } else {
  //   res.locals.userId = ''
  // }
  return next()
})

app.use((req, res, next) => {
  req.io = io
  next()
})

app.use(express.json())
app.use(
  bodyParser.json({
    limit: '1024000000000mb',
  })
)

app.use(
  bodyParser.urlencoded({
    extended: true,
    parameterLimit: 100000,
    limit: '1024000000000mb',
  })
)

app.param('lang', (req, res, next, lang) => {
  i18n.setLocale(req, lang)
  res.locals.lang = i18n.getLocale(req)
  next()
})

// app.use((req, res, next) => {
//   res.locals.lang = i18n.getLocale(req)
//   // console.log('Res lang:', res.locals.lang)
//   next()
// })

app.use(i18n.init)

// app.all('/', (req, res) => {
//   res.redirect(`/${i18n.getLocale(req)}`)
// })

// app.use('/:lang', privatedRoutes)

// app.use('/change-lang/:lang', (req, res) => {
//   res.redirect(`/${req.params.lang}`)
// })

apiRoutes(app)

httpServer.listen(port)

console.log('QRipy server is running on ' + port)
