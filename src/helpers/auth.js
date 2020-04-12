//Genero un middleware para validar la autenticacion de los usuarios

const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error_msg', 'Not Authenticated');
    res.redirect('/users/signin');
  }
};

module.exports = helpers;
