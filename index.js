'use strict'
//GALLARDO DUEÑAS CARLOS IVAN
const express =  require('express')
const mongoose = require('mongoose')
const hbs = require('express-handlebars')
const app = express()
const config = require('./config')
const router = require('./routers/routes')
const methodOverride = require('method-override')
const path = require('path')
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//app.use('/static', express.static('public'))
app.use(express.static(path.resolve('./public')));

//motor de vistas
app.engine('.hbs', hbs({
   defaultLayout: 'index',
    extname : '.hbs'
}))

app.set('view engine', '.hbs')
app.use(methodOverride('_method'))

//Router app

app.use('/', router)

mongoose.connect(config.db, config.urlParser, {
   
}).then( () =>console.log('DB CONNECTED'))
.catch(err => console.log(err));

app.listen(config.port, () =>{
    console.log('Ejecutando en  http://localhost:' + config.port)
});

