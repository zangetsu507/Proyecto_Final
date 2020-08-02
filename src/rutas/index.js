const express = require('express');
const app = express.Router();
const passport = require('passport');

const Contactos = require('../models/contactos');
const Pedidos = require('../models/pedidos');



const stripe = require('stripe')('sk_test_51H9Le7KaGC0LxOgTl3IWK99MuaXjYFWaWQ64eEjsvU6QHjuHz7tWpeDx6QYm5y10FG7JdODnGGEu3jpC7VcKelF900lGKKJ06R');

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
    res.render('Ordenar_Online.html', {title:"Ordenar Online"});
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

app.post('/Ordernar_Online', async (req,res) => {
    const customer = await stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    });
    const charge = await stripe.charges.create({
        amount: '1400',
        currency:'usd',
        customer:customer.id,
        description: 'Pasteles'
    });

    const pedidos = new Pedidos();
    pedidos.email = req.body.stripeEmail;
    pedidos.cod_compra = req.body.stripeToken;
    pedidos.unidad = 1;
    pedidos.precio = 14;
    await pedidos.save(err => {
       if(err) return next(err);
       res.redirect('./Home');
   });

});

module.exports = app;