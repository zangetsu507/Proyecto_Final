const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactosSchema = new Schema({
    nombre: String,
    email: String,
    telefono: String,
    descripcion: String,
});

module.exports = mongoose.model('Contactos',ContactosSchema);