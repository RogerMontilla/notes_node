const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');


//Validacion del Loging
passport.use('login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      //Match email's user
      const user = await User.findOne({ email });
      if (!user) {
        //devuelve un mensaje a connet-flash
        return done(null, false, { message: 'Not User Found' });
      } else {
        //Match Password's User
        //Ejecutamos el metodo creado el el Schema ver: user.js
        const match = await user.matchPassword(password);
        if (match) {
          //devuelve el usuario a passpor para que lo mantenga en la sesion
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect Password' });
        }
      }
    }
  )
);

//Cuando el usuario sea registrado se guarda en la sesion del servidor
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//cuando el usuario comience a navegar passpor valida el id de usuario a ver si existe
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});