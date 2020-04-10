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
//New Note
router.get('/notes/add', renderNoteForm);
router.post('/notes/new-note', createNewNote);

//Get All Notes
router.get('/notes', renderNotes);

//Edit Notes
router.get('/notes/edit/:id', renderEditForm);
router.put('/notes/edit/:id', updateNote);

//Delete Notes
router.delete('/notes/delete/:id', deleteNote);

module.exports = router;
