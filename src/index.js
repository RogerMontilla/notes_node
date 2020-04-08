//Lee el archivo .env y asigna los valores a las variables de entorno, asi evitamos mostrar informacion sensible
//se debe requerir siempre dotenv al principio para cargar las variables de entorno 
require('dotenv').config();

/*requerimos el archivo server.js al realizar este paso el app de server es el mismo que tengo aca en el index*/
const app = require('./server');
//requerimos el archivo con la coneccion a la base de datos
require('./database');

//requiero la variable port desde el server.js
app.listen(app.get('port'), () => {
  console.log(`Server on port: ${app.get('port')}`);
});
