const { User } = require('../models');

class RegisterController {
  static showRegisterForm(req, res) {
    const { duplicateError, validationErrors } = req.query;
    res.render('register', { duplicateError, validationErrors });
  }

  static createUser(req, res) {
    const { username, email, password, role } = req.body;
    User.findOne({
      where: { username }
    })
    .then((result) => {
      if(result) throw { name: 'duplicateUsernameOrEmail', message: 'username or email is already used'};

      return User.findOne({
        where: { email }
      });
    })
    .then((result) => {
      if(result) throw { name: 'duplicateUsernameOrEmail', message: 'username or email is already used'};

      return User.create({ username, email, password, role })
    })
    .then(() => {
      res.redirect('/login');
    })
    .catch((err) => {
      if(err.name === 'duplicateUsernameOrEmail') {
        res.redirect('/register?duplicateError=username or email is already used');
      } else if(err.name === 'SequelizeValidationError') {
        const validationErrors = err.errors.map((error) => error.message);
        res.redirect(`/register?validationErrors=${validationErrors}`);
      } else {
        console.log(err);
        res.send(err);
      }
    });
  }
}

module.exports = RegisterController;