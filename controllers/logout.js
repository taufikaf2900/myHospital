class LogoutController {
  static logout(req, res) {
    req.session.destroy((err) => {
      if(err) {
        console.log(err);
      } else {
        res.redirect('/login');
      }
    })
  }
}

module.exports = LogoutController;