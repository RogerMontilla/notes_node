//requiero el modulo ruter desde express
const { Router } = require('express');
const router = Router();

//llamo las funciones desde el archivo notes.controller
//en el mismo ejecuto las funciones de busqueda y renderizado de vistas
const {
  renderNoteForm,
  createNewNote,
  renderNotes,
  renderEditForm,
  updateNote,
  deleteNote,
} = require('../controllers/notes.controller');

const {isAuthenticated} = require('../helpers/auth');
//New Note
router.get('/notes/add',isAuthenticated, renderNoteForm);
router.post('/notes/new-note', createNewNote);

//Get All Notes
router.get('/notes',isAuthenticated ,renderNotes);

//Edit Notes
router.get('/notes/edit/:id',isAuthenticated, renderEditForm);
router.put('/notes/edit/:id',isAuthenticated, updateNote);

//Delete Notes
router.delete('/notes/delete/:id',isAuthenticated, deleteNote);

module.exports = router;
