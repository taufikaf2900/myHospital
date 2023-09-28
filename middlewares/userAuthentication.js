const userAuthentication = (req, res, next) => {
  if(!req.session.userId) {
    res.redirect('/login?errorAuthentication=please login first');
  } else {
    next();
  }
}

module.exports = userAuthentication;