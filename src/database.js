//requerimos mongoose
const mongoose = require('mongoose');
//se traen los valores del objeto que genera process.env y quedan con los nombres que estan en el archivo .env
const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE } = process.env;
//creamos la constante con la direccion de la base de datos
const mongodbURI = `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`;

//configuracion de la coneccion a mongoDB
mongoose
  .connect(mongodbURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then((db) => console.log('###Conected to MongoDB###'))
  .catch((err) => console.log(err));
