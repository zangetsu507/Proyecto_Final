const mongoose = require('mongoose');
const {Schema, model} = require("mongoose");

const productos = new Schema({
    product_name: String,
    descripcion: String,
    unidad: Number,
    precio: Number,
    Imagen: String
});

module.exports = model('productos',productos);