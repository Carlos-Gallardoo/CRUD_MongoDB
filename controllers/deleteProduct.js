/* jshint esversion: 6 */

const product = require("../models/product")

module.exports = (req,res) =>{
    let datoBusqueda = req.params.productId
    product.findById(datoBusqueda, (err, product)=> {

        if(err) return res.status(500).send({message: 'Error al borrar producto'+ err})

        product.remove(err =>{
            if(err) return res.status(500).send({message: 'Error al borrar producto'+ err})

           // res.status(200).send({message: 'producto eliminado con exito'})
           console.log('archivo borrado exitosamnete');
            res.redirect('/api/product');
        })

    });

}