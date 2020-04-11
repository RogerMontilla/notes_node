const notesCtrl = {};
const Note = require('../models/note');

notesCtrl.renderNoteForm = (req, res) => {
  res.render('notes/new-note');
};

notesCtrl.createNewNote = async (req, res) => {
  const { title, description } = req.body;
  //se guardan las variables title y description dentro del modelo Notes
  //en este caso no escribo title:title (la que viene de req.body y la de la base de datos)
  //porque al tener las variables el mismo
  //nombre JS me deja colocarlas una sola vez
  var newNote = new Note({ title, description });
  await newNote.save();
  req.flash('success_msg', 'Note Added Successfully');
  res.redirect('/notes');
};

notesCtrl.renderNotes = async (req, res) => {
  const notes = await Note.find().lean();
  // paso el objeto notes con el valor encontrado
  res.render('notes/all-notes', { notes });
};

notesCtrl.renderEditForm = async (req, res) => {
  const note = await Note.findById(req.params.id).lean();
  res.render('notes/edit-note', { note });
};

notesCtrl.updateNote = async (req, res) => {
  //Destructuring
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, description });
  req.flash('success_msg','Note Pad Updated Successfully');
  res.redirect('/notes');
};

notesCtrl.deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash('success_msg','Note Pad Deleted Successfully')
  res.redirect('/notes');
};

module.exports = notesCtrl;
