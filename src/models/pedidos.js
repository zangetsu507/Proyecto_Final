const mongoose = require('mongoose');
const {Schema, model} = require("mongoose");

const pedidos = new Schema({
    email: String,
    cod_compra: String,
    unidad: Number,
    precio: Number,
});

module.exports = model('pedidos',pedidos);