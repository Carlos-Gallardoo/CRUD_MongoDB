/* jshint esversion: 6 */

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

//metodo post  para el registro 
const storeUserController = require('../controllers/storeUser');
router.post('/auth/register',redirectIfAuh, storeUserController)

const newUserController = require('../controllers/newUser');
router.get('/users/register',redirectIfAuh, newUserController)

const loginController = require('../controllers/login');
router.get('/users/login',redirectIfAuh, loginController);

const loginUserController = require('../controllers/loginUser');
router.post('/auth/login',redirectIfAuh, loginUserController);

//metodo LOGOUT 
const logoutController = require('../controllers/logout');
router.get('/users/logout',logoutController);


router.get('/',authMiddleware, (req, res)=>{
  //  res.status(200).send('hola mundo soy home');
  console.log(req.session)
    res.render('home')
    });
//Consulta de todos los datos 
router.get('/api/product',authMiddleware, (req,res) =>{
    product.find({}, (err, products) => {
        if(err) return res.status(500).send({
            message: 'Error al realizar la peticion ' +err
        });

        if(!products) return res.status(404).send({
            message: 'No existen los productos' 
        });

       // res.status(200).send({ products: [products] });
      // console.log(products);
       res.render('showProducts', {products})
    }).lean()

});
//GALLARDO DUEÑAS CARLOS IVAN 16211997

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
       // res.status(200).send({product:products});
        res.render('editar', {product: products})
    }).lean();

});


router.get('/insertar',authMiddleware, (req,res)=> {
     res.render('product');
   
})

//Insertar valores en la base de datos 
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

//modificar product PUT
const putProduct = require('../controllers/putProduct');

router.put('/api/product/:productId',authMiddleware, putProduct);


//borrar un registro DELETE 
const deleteProduct = require('../controllers/deleteProduct');
const { ESRCH } = require('constants');

router.delete('/api/product/:productId',authMiddleware, deleteProduct);

     router.use((req,res)=>{
        res.status(404).render('notfound');
        //res.render('notfound')
    });
    
    