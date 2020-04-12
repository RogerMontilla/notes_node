const usersCtrl = {};
const User = require('../models/user');
const passport = require('passport');

usersCtrl.renderSingUpForm = (req, res) => {
  res.render('users/signup');
};

usersCtrl.signUp = async (req, res) => {
  const errors = [];
  const { name, email, password, confirm_password } = req.body;
  if (password != confirm_password) {
    errors.push({ text: 'Password do not match' });
  }
  if (password.length < 4) {
    errors.push({ text: 'Password most be at least 4 characters' });
  }
  if (errors.length > 0) {
    res.render('users/signup', { errors, name, email });
  } else {
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash('error_msg', 'The email is already in use');
      res.redirect('/users/signup');
    } else {
      const newUser = new User({ name, email, password });
      //añado este paso para cifrar la contraseña que me dio el usuario
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash('success_msg', 'You are registered succesfully');
      res.redirect('/users/signin');
    }
  }
};

usersCtrl.renderSingInForm = (req, res) => {
  res.render('users/signin');
};

usersCtrl.signIn = passport.authenticate('login', {
  failureRedirect: '/users/signin',
  successRedirect: '/notes',
  failureFlash: true,
});

usersCtrl.logout = (req, res) => {
  req.logout()
  req.flash('success_msg','You are logged out now')
  res.redirect('/users/signin');
};

module.exports = usersCtrl;
