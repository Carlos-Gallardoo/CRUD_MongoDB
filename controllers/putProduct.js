/* jshint esversion: 6 */

const product = require("../models/product");

module.exports = (req,res)=>{
    
    let datoModificar = req.params.productId;
    let update = req.body;

    product.findByIdAndUpdate(datoModificar, update, (err, products)=>{
        if(err) return res.status(500).send({
            message: 'Error al actualizar producto ' +err
        });

        if(!products) return res.status(404).send({
            message: 'No existe el producto' 
        });
       // res.status(200).send({product:products});
       console.log('archivo modificado exitosamente');
       res.redirect('/api/product')
    });
}