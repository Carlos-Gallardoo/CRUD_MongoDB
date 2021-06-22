'use strict'
//GALLARDO DUEÑAS CARLOS IVAN
const express =  require('express')
const mongoose = require('mongoose')
const hbs = require('express-handlebars')
const app = express()
const config = require('./config')
const router = require('./routers/routes')
const methodOverride = require('method-override')
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/static', express.static ('public'))

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
//conexion a la base de datos y levantar servidor 
/*mongoose.connect(config.db,(err,res )=>{
        if(err){
            return console.log('error al conectar con la BD ${err}')
        }
        console.log('conexion con la BD exitosa')

        app.listen(config.port, ()=>{
            console.log('servidor en linea ejecutandose en http://localhost:${config.port}')
        });
});*/
