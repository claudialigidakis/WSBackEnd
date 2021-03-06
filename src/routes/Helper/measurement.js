const express = require('express')
const router = express.Router()
const measurementController = require('../../controllers/Helper/measurement')


router.get('/volume', measurementController.volume)
router.get('/length', measurementController.length)
router.get('/mass', measurementController.mass)
router.get('/wrightStream/:shopId', measurementController.wrightStream)
router.post('/orderPredictor', measurementController.orderPredictor)
router.post('/compareOrder/:shopId', measurementController.compareOrderPredictor)


module.exports = router
