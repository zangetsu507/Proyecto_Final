const express = require('express');
const app = express.Router();
const passport = require('passport');

const Contactos = require('../models/contactos');
const Product = require('../models/productos');


app.get('/Contactos', (req, res) => {
    res.render('Contactos.html', {title:"Contactos"});
});

app.get('/Home', (req, res) => {
    res.render('Home.html', {title:"Candy Curner"});
});

app.get('/Menu', (req, res) => {
    res.render('Menu.html', {title:"Catalogo"});
});

app.get('/Ordenar_Online', isAuthenticated,async (req, res) => {
    const products = await Product.find();
    
    res.render('Ordenar_Online.html', {products : products,title:"Ordenar Online"});
});

app.get('/Sucursales', (req, res) => {
    res.render('Sucursales.html', {title:"Sucursales"});
});

app.get('/Crear_cuenta', (req, res) => {
    res.render('Crear_cuenta.html', {title:"Crear cuenta",});
});

app.get('/Iniciar_sesion', (req, res) => {
    res.render('Iniciar_sesion.html', {title:"Iniciar Sesión",});
});

app.post('/Crear_cuenta',passport.authenticate('local-signup',{
successRedirect:'/Iniciar_sesion',
failureRedirect:'/Crear_cuenta',
passReqToCallback: true
}));

app.post('/Iniciar_sesion', passport.authenticate('local-signin',{
successRedirect:'/Home',
failureRedirect:'/Iniciar_sesion',
passReqToCallback: true
}));

app.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/Home')
});

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/Home')
};

app.post('/Contactos', async (req, res) => {
    const contactos = new Contactos();
    contactos.nombre = req.body.nombre_us;
    contactos.email = req.body.email_us;
    contactos.telefono = req.body.telefono_us;
    contactos.descripcion = req.body.descripcion_us;
    await contactos.save(err => {
       if(err) return next(err);
       res.redirect('./Contactos');
   });
});

module.exports = app;