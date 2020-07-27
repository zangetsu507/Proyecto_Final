const express = require('express');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

//Inicializaciones
const app = express();
require('./database');
require('./passport/local-auth');

//Configuraciones
app.set('port',3030);
app.set('views', path.join(__dirname, 'views'));
app.engine('html',require('ejs').renderFile);
app.set('view engine', 'ejs');

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret:'noseametido',
    resave: false,
    saveUninitialized:false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.user = req.user;
    next();
});
//Archivos estaticos
app.use(express.static(path.join(__dirname,'public')));

//rutas
app.use(require('./rutas/index'));


// Escuhando el servidor
app.listen(app.get('port'), () => {
    console.log('Escuchando servidor en el puerto',app.get('port'));
});
