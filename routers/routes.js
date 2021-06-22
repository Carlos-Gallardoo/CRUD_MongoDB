/* jshint esversion: 6 */

const express  = require('express');
const path = require('path');
const product = require('../models/product');



//Create a router object
const router = express.Router();

// export our router 
module.exports = router;


router.get('/', (req, res)=>{
  //  res.status(200).send('hola mundo soy home');
    res.render('home')
    });
//Consulta de todos los datos 
router.get('/api/product', (req,res) =>{
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
router.get('/api/product/:datoBusqueda', (req,res) =>{
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


router.get('/insertar', (req,res)=> {
    res.render('product');
})

//Insertar valores en la base de datos 
router.post('/api/product', (req,res) => {
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

router.put('/api/product/:productId', putProduct);


//borrar un registro DELETE 
const deleteProduct = require('../controllers/deleteProduct');
const { ESRCH } = require('constants');

router.delete('/api/product/:productId', deleteProduct);


    router.get('/login', (req, res)=>{
    res.status(200).send('hola mundo soy pagina login');
    //res.render('home')
     });

     router.use((req,res)=>{
        res.status(404).render('notfound');
        //res.render('notfound')
    });
    