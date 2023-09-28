class Controller {
  static showHomePage(req, res) {
    res.render('home');
  }

  static redirectToLoginPage(req, res) {
    res.redirect('/login');
  }
}

module.exports = Controller;