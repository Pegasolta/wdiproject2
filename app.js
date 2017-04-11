// express set up
var express = require('express')
var app = express()
var port = process.env.PORT || 4000

// mongoose setup
var dbURI = process.env.PROD_MONGODB || 'mongodb://localhost:27017/wdi-project2'
var mongoose = require('mongoose')
mongoose.connect(dbURI)

// check if our connection is okay
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
    // we're connected!
    console.log('really really connected')
})

// transform form data to req.body
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())


app.get('/', function(req, res) {
    res.render('backendhome')
})

// setup the ejs template
app.set('view engine', 'ejs')

// // setting the layout structure
// var ejsLayouts = require('express-ejs-layouts')
// app.use(ejsLayouts)

// setup the method override
var methodOverride = require('method-override')
app.use(methodOverride('_method'))

// require the users_controller
var usersController = require('./controllers/users_controller')
app.use(usersController)

// require the checkout_controller
var checkoutController = require('./controllers/checkout_controller')
app.use(checkoutController)



app.use(function (req, res) {
    res.send('error found')
})

app.listen(port, function () {
    console.log('app is running at ' + port)
})
