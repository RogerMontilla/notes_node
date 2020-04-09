//creo un objeto con las funciones de renderizado
const indexCtrl = {};

//ingreso al objeto los elemento renderIndex y renderAbout
indexCtrl.renderIndex = (req, res) => {
  res.render('index');
};

indexCtrl.renderAbout = (req, res) => {
    res.render('about');
  };
  
module.exports=indexCtrl;