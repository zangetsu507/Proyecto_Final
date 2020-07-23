const express = require('express');
const app = express();

const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser= require('body-parser');
const session = require('express-session');

const {url} = require('./config/database');

mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

//require('./config/passport')(passport);

//Configuraciones
app.set('port',3030);
app.set('views', path.join(__dirname, 'views'));
app.engine('html',require('ejs').renderFile);
app.set('view engine', 'ejs');

//Middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: 'candy curner',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Archivos estaticos
app.use(express.static(path.join(__dirname,'public')));

//rutas
require('./app/index')(app,passport);


// Escuhando el servidor
app.listen(app.get('port'), () => {
    console.log('Escuchando servidor en el puerto',app.get('port'));
});
