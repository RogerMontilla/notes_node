/*En este archivo se configura el serividor con express*/
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
//Handlebars
const exphbs = require('express-handlebars');

//###Initializations###
const app = express();

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
//###Global Variables###

//###Routes###
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));
//###Static Files###
app.use(express.static(path.join(__dirname, 'public')));

/*Se exporta el modulo expres para poder ser requeriod desde otro archivo*/
module.exports = app;
