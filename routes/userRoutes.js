const express = require('express')

const router = express.Router()

const controller = require('../controllers/userController')

const verifyToken = require('../lib/verify_token')

router.post('/', controller.create)
router.post('/login', controller.login)
router.post('/logout', controller.logout)
router.get('/', verifyToken, controller.retrieve)
router.get('/:id', verifyToken, controller.retrieveOne)
router.put('/', verifyToken, controller.update)
router.delete('/', verifyToken, controller.delete)

module.exports = router
