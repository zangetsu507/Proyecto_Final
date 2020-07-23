module.exports = (app,passport) =>{

app.get('/Contactos', (req, res) => {
    res.render('Contactos.html', {title:"Contactos"});
});

app.get('/Home', (req, res) => {
    res.render('Home.html', {title:"Candy Curner"});
});

app.get('/Menu', (req, res) => {
    res.render('Menu.html', {title:"Catalogo"});
});

app.get('/Ordenar_Online', (req, res) => {
    res.render('Ordenar_Online.html', {title:"Ordenar Online"});
});

app.get('/Sucursales', (req, res) => {
    res.render('Sucursales.html', {title:"Sucursales"});
});

app.get('/Crear_cuenta', (req, res) => {
    res.render('Crear_cuenta.html', {
        title:"Crear cuenta",
        message: req.flash('singupmessage')
    });
});

app.get('/Iniciar_sesion', (req, res) => {
    res.render('Iniciar_sesion.html', {
        title:"Iniciar Sesión",
        message: req.flash('loginmessage')});
});

app.post('/Iniciar_sesion',(req, res) => {

});
app.post('/Crear_cuenta',(req, res) => {

});
};