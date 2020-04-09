/* voy a crear los Schemes para mongoDB */
//requerimoa mongoose y las variables Schema y model con ECMAScript6
const { Schema, model } = require('mongoose');

//###Schema de Notas###
//timestamps: true, me dice cuando fue creado y/o modificado un schema
const NoteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    descrition: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
//Creamos el model y lo exportamos
module.exports = model('Note', NoteSchema);
