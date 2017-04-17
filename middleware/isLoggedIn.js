module.exports = function (req, res, next) {
  console.log("runs");
  if (!req.user) {
    req.flash('error', 'You must be logged in to access that page')
    res.redirect('/backend/login')
    return
  } else {
    next()
    return
  }
}
