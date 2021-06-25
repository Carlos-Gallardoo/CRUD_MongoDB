/* jshint esversion: 6 */
//GALLARDO DUEÑAS CARLOS IVAN 16211997
const express  = require('express');
const path = require('path');
const product = require('../models/product');
const session = require('express-session');
const authMiddleware = require('../middleware/authMiddleware');
const redirectIfAuh = require('../middleware/redirectIfAuth')
//Create a router object
const router = express.Router();

// export our router 
module.exports = router;

//activacion de las sesiones (cookies)
router.use(session({
    secret: 'D$YTRH#%#$@^$#YR',
    resave: false,
    saveUninitialized: true,
    maxAge: Date.now() + (30 * 86400 * 1000),
}));

//Variables globales 
router.use((req,res,next)=>{
    res.locals.loggedIn = req.session.userId || null;
    next()
});

//metodos de REGISTRO
const newUserController = require('../controllers/newUser');
router.get('/users/register',redirectIfAuh, newUserController)

const storeUserController = require('../controllers/storeUser');
router.post('/auth/register',redirectIfAuh, storeUserController)


//metodos de LOGIN
const loginController = require('../controllers/login');
router.get('/users/login',redirectIfAuh, loginController);

const loginUserController = require('../controllers/loginUser');
router.post('/auth/login',redirectIfAuh, loginUserController);

//metodo LOGOUT 
const logoutController = require('../controllers/logout');
router.get('/users/logout',logoutController);

//pagina HOME
router.get('/',authMiddleware, (req, res)=>{
  console.log(req.session)
    res.render('home')
    });


//TODOS LOS PRODUCTOS
router.get('/api/product',authMiddleware, (req,res) =>{
    product.find({}, (err, products) => {
        if(err) return res.status(500).send({
            message: 'Error al realizar la peticion ' +err
        });

        if(!products) return res.status(404).send({
            message: 'No existen los productos' 
        });

       res.render('showProducts', {products})
    }).lean()

});

//consulta por filtro 
router.get('/api/product/:datoBusqueda',authMiddleware, (req,res) =>{
    let datoBusqueda = req.params.datoBusqueda;
    product.findById(datoBusqueda, (err, products) =>{
//product.findOne({name:datoBusqueda}, (err,products) => {
        if(err) return res.status(500).send({
            message: 'Error al realizar la peticion ' +err
        });

        if(!products) return res.status(404).send({
            message: 'No existe el producto' 
        });
        res.render('editar', {product: products})
    }).lean();

});

// VISTA INSERTAR PRODUCTO
router.get('/insertar',authMiddleware, (req,res)=> {
     res.render('product');
   
})

//INSERTAR PRODUCTO 
router.post('/api/product',authMiddleware, (req,res) => {
    let producto =  new product();
    producto.name = req.body.name;
    producto.picture = req.body.picture;
    producto.price = req.body.price;
    producto.category = (req.body.category).toLowerCase();
    producto.description = req.body.description;

    console.log(req.body);

    producto.save((err, productoStored) => {
        if(err)  return res.status(500).send({
            message: 'Error al realizar la peticion ' +err
        });
       // res.status(200).send({producto: productoStored});
        res.redirect('/api/product');
    });
});

//MODIFICAR PRODUCTO
const putProduct = require('../controllers/putProduct');
router.put('/api/product/:productId',authMiddleware, putProduct);


//BORRAR PRODUCTO
const deleteProduct = require('../controllers/deleteProduct');
const { ESRCH } = require('constants');
router.delete('/api/product/:productId',authMiddleware, deleteProduct);


//PAGINA NO ENCONTRADA
     router.use((req,res)=>{
        res.status(404).render('notfound');
        //res.render('notfound')
    });
    
    