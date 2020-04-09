const { Router } = require('express');
const router = Router();
//requiero del objeto indexCtrl las funciones flecha renderIndex y renderAbout
const {renderIndex,renderAbout}=require('../controllers/index.controller')
//ruta al archivo index.hbs
router.get('/',renderIndex)
router.get('/about',renderAbout);

//exportamos el modulo para que pueda ser utilizados por el server.js
module.exports = router;
