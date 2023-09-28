const { User } = require('../models');
const bcrypt = require('bcryptjs');

class LoginController {
  static showLoginForm(req, res) {
    const { error, errorAuthentication } = req.query;
    res.render('login_taufik', { error, errorAuthentication });
  }

  static login(req, res) {
    const { email, password } = req.body;
    User.findOne({
      where: { email }
    })
    .then((user) => {
      if(user) {
        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if(isPasswordValid) {
          req.session.userId = user.id;
          req.session.role = user.role;
          return res.redirect('/hospital/patient');
        } else {
          return res.redirect('/login?error=invalid email or password');
        }
      } else {
        return res.redirect('/login?error=invalid email or password');
      }
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
  }
}

module.exports = LoginController;