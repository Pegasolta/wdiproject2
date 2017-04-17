var express = require('express')
var router = express.Router()
var Order = require("../models/order")

// GET /HOLIDAY STYLES
router.get('/', function (req, res) {
    res.render('holiday-styles/holidaystyles')
})

// GET /HOLIDAY STYLES /ADVENTURE
router.get('/adventure', function (req, res) {
    res.render('holiday-styles/adventure/adventure')
})

router.get('/adventure/budget', function (req, res) {
    res.render('holiday-styles/adventure/adventurebudget')
})

router.get('/adventure/regular', function (req, res) {
    res.render('holiday-styles/adventure/adventureregular')
})

router.get('/adventure/luxury', function (req, res) {
    res.render('holiday-styles/adventure/adventureluxury')
})


// GET /HOLIDAY STYLES /EXPERIENCE
router.get('/experience', function (req, res) {
    res.render('holiday-styles/experience/experience')
})

router.get('/experience/budget', function (req, res) {
    res.render('holiday-styles/experience/experiencebudget')
})

router.get('/experience/regular', function (req, res) {
    res.render('holiday-styles/experience/experienceregular')
})

router.get('/experience/luxury', function (req, res) {
    res.render('holiday-styles/experience/experienceluxury')
})

// GET /HOLIDAY STYLES /GETAWAY
router.get('/getaway', function (req, res) {
    res.render('holiday-styles/getaway/getaway')
})

router.get('/getaway/budget', function (req, res) {
    res.render('holiday-styles/getaway/getawaybudget')
})

router.get('/getaway/regular', function (req, res) {
    res.render('holiday-styles/getaway/getawayregular')
})

router.get('/getaway/luxury', function (req, res) {
    res.render('holiday-styles/getaway/getawayluxury')
})

// GET /HOLIDAY STYLES /WILDCARD
router.get('/wildcard', function (req, res) {
    res.render('holiday-styles/wildcard/wildcard')
})

router.get('/wildcard/budget', function (req, res) {
    res.render('holiday-styles/wildcard/wildcardbudget')
})

router.get('/wildcard/regular', function (req, res) {
    res.render('holiday-styles/wildcard/wildcardregular')
})

router.get('/wildcard/luxury', function (req, res) {
    res.render('holiday-styles/wildcard/wildcardluxury')
})

module.exports = router
