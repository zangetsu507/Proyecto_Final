const express = require('express');
const router = express.Router();

router.get('/Contactos', (req, res) => {
    res.render('Contactos.html', {title:"Contactos"});
});

router.get('/Home', (req, res) => {
    res.render('Home.html', {title:"Candy Curner"});
});

router.get('/Menu', (req, res) => {
    res.render('Menu.html', {title:"Catalogo"});
});

router.get('/Ordenar_Online', (req, res) => {
    res.render('Ordenar_Online.html', {title:"Ordenar Online"});
});

router.get('/Sucursales', (req, res) => {
    res.render('Sucursales.html', {title:"Sucursales"});
});

router.get('/Crear_cuenta', (req, res) => {
    res.render('Crear_cuenta.html', {title:"Crear cuenta"});
});

router.get('/Iniciar_sesion', (req, res) => {
    res.render('Iniciar_sesion.html', {title:"Iniciar Sesión"});
});
module.exports = router;