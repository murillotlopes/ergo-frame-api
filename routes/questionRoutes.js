const express = require('express')

const router = express.Router()

const controller = require('../controllers/questionController')

const verifyToken = require('../lib/verify_token')

router.post('/', verifyToken, controller.create)
router.get('/', verifyToken, controller.retrieve)
router.get('/group/:groupId', verifyToken, controller.retrieveByGroup)
router.get('/group-number/:groupId/:number', verifyToken, controller.retrieveByGroupAndNumber)
router.get('/:id', verifyToken, controller.retrieveOne)
router.put('/', verifyToken, controller.update)
router.delete('/', verifyToken, controller.delete)

module.exports = router
