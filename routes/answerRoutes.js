const express = require('express')

const router = express.Router()

const controller = require('../controllers/answerController')

const verifyToken = require('../lib/verify_token')

router.post('/', verifyToken, controller.create)
router.get('/assessment/:id', verifyToken, controller.retrieve)
router.get('/:id', verifyToken, controller.retrieveOne)
router.put('/', verifyToken, controller.update)
router.delete('/', verifyToken, controller.delete)

module.exports = router
