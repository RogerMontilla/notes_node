//###Schema de Usuarios###
//requerimos el modulo bcryptjs para cifrar las passwords
const bcrypt = require('bcryptjs');

//requerimos las variables Schema y model
const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//siframos las passwords con bcryptjs usando un hash
UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  //devuelve la contraseña sifrada
  return await bcrypt.hash(password, salt);
};

//comparamos la contraseña que nos da el usuario
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
//el this.password corresponde a la contraseña cifrada que esta en la base de datos

module.exports = model('User', UserSchema);
