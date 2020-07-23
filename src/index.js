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

});

//Configuraciones
app.set('port',3030);
app.set('views', path.join(__dirname, 'views'));
app.engine('html',require('ejs').renderFile);
app.set('view engine', 'ejs');


//Archivos estaticos
app.use(express.static(path.join(__dirname,'public')));

//rutas
app.use(require('./rutas/index'));


// Escuhando el servidor
app.listen(app.get('port'), () => {
    console.log('Escuchando servidor en el puerto',app.get('port'));
});
