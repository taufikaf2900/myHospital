class Controller {
  static showHomePage(req, res) {
    res.send('This is home page brother');
  }

  static redirectToLoginPage(req, res) {
    res.redirect('/login');
  }
}

module.exports = Controller;