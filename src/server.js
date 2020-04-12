/*En este archivo se configura el serividor con express*/
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

//###Initializations###
const app = express();
require('./config/passport');

//###Settings###
//configuracion del servidor
app.set('port', process.env.PORT || 3000);
//se cambia la ubicacion de la carpeta views usando el modulo path
app.set('views', path.join(__dirname, 'views'));
//config del motor de plantillas hbs
app.engine(
  '.hbs',
  exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
  })
);

app.set('view engine', '.hbs');

//###Middlewares###
app.use(morgan('dev'));
// me permite cambiar la peticion que me envia el usuario de post a DELETE, lo cambio en el boton de borrar
// de la tarjeta usando ?_method=DELETE en la url que accede el cliente
// tambien hay que añadir un input oculto (ver archivo all-notes.hbs)
app.use(methodOverride('_method'));
//urlencoded: convierte los datos en un objeto JSON
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'UnqlsxT34',
    resave: true,
    saveUninitialized: true,
  })
);
//para enviar mensajes al cliente
app.use(flash());
//Validacion y seguimiento de usuarios
//Passport va despues de session porque passpord se basa en session
app.use(passport.initialize());
app.use(passport.session());

//###Global Variables###
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  //Mensaje que viene desde passport:
  res.locals.error = req.flash('error');
  //Variable con la validacion del usuario
  res.locals.user = req.user || null;
  next();
});
//###Routes###
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/users.routes'));
//###Static Files###
app.use(express.static(path.join(__dirname, 'public')));

/*Se exporta el modulo expres para poder ser requeriod desde otro archivo*/
module.exports = app;
