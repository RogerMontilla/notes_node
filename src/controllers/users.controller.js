const usersCtrl = {};
const User = require('../models/user');

usersCtrl.renderSingUpForm = (req, res) => {
  res.render('users/singup');
};

usersCtrl.singUp = async (req, res) => {
  const errors = [];
  const { name, email, password, confirm_password } = req.body;
  if (password != confirm_password) {
    errors.push({ text: 'Password do not match' });
  }
  if (password.length < 4) {
    errors.push({ text: 'Password most be at least 4 characters' });
  }
  if (errors.length > 0) {
    res.render('users/singup', { errors, name, email });
  } else {
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash('error_msg', 'The email is already in use');
      res.redirect('/users/singup');
    } else {
      const newUser = new User({ name, email, password });
      //añado este paso para cifrar la contraseña que me dio el usuario
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash('success_msg', 'You are registered succesfully');
      res.redirect('/users/singin');
    }
  }
};

usersCtrl.renderSingInForm = (req, res) => {
  res.render('users/singin');
};

usersCtrl.singIn = (req, res) => {
  res.send('Sing In');
};

usersCtrl.logout = (req, res) => {
  res.send('Logout');
};

module.exports = usersCtrl;
