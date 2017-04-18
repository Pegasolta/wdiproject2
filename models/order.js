var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')
var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/

var OrderSchema = new mongoose.Schema({
    duration: {
        type: Number,
        required: true,
        trim: true
    },
    pax: {
        type: Number,
        required: true,
        trim: true
    }
})

OrderSchema.pre('save', function(next) {
    var order = this

    // Only hash the password if it has been modified (or is new)
    if (!order.isModified('password')) return next()

    //hash the password
    var hash = bcrypt.hashSync(order.password, 10)

    // Override the cleartext password with the hashed one
    order.password = hash
    next()
})

OrderSchema.methods.validPassword = function (password) {
    // Compare is a bcrypt method that will return a boolean,
    return bcrypt.compareSync(password, this.password)
}

OrderSchema.options.toJSON = {
    transform: function(doc, ret, options) {
        // delete the password from the JSON data, and return
        delete ret.password
        return ret
    }
}

module.exports = mongoose.model('Order', OrderSchema)
