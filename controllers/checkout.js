var express = require('express')
var router = express.Router()
var Order = require("../models/order")
var path = require("path")

// POST /Checkout form
router.post('/:categoryId/:budgetId', function (req, res) {
    // res.send(req.body)
    if (req.body.duration &&
        req.body.pax) {
        // create object with form input
        var newOrder = new Order({
            duration: req.body.duration,
            pax: req.body.pax
        })

        // use schema's `save` method to insert document into Mongo
        newOrder.save(function (error, user) {
            if (error) {
                req.flash('error', 'Could not place order, contact support (hello@anywhr.co)')
                res.redirect(req.params.budgetId)
            } else {
                res.render('checkoutSuccess')
            }
        })

    } else {
        req.flash('error', 'All fields required')
        return res.redirect(req.params.budgetId)
    }
})

// GET /Holiday styles
router.get('/', function (req, res) {
    res.render('holiday-styles/holidaystyles')
})

// GET /Holiday style routes
router.get('/:categoryId', function (req, res) {
    res.render(path.join('holiday-styles', req.params.categoryId, req.params.categoryId))
})

router.get('/:categoryId/:budgetId', function (req, res) {
    res.render(path.join('holiday-styles', req.params.categoryId, req.params.budgetId), {
        categoryId: req.params.categoryId,
        budgetId: req.params.budgetId
    })
})

module.exports = router
