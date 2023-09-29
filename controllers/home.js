class HomeController {
  static showHomePage(req, res) {
    res.render('home');
  }

  static notFoundPage(req, res) {
    res.render('pageNotFound');
  }
}

module.exports = HomeController;