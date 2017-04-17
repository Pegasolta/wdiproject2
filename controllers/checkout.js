var express = require('express')
var router = express.Router()
var Order = require("../models/order")

// GET /HOLIDAY STYLES
router.get('/holiday-styles', function (req, res) {
    res.render('holiday-styles/holidaystyles')
})

module.exports = router
