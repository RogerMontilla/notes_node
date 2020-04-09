/*En este archivo se configura el serividor con express*/
const express = require('express');
const path = require('path');
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
