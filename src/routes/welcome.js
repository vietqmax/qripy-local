const express = require('express')
const router = express.Router()
const WelcomeController = require('../controllers/welcome.controller')

router.get('/:lang', WelcomeController.welcome)

module.exports = router
