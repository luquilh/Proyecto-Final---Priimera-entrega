const express = require('express');
const {Router}= express;
const routerCarrito = new Router();

const {crearCarrito, borrarCarrito, obtenerProductosCarrito, agregarProductoAlCarrito, borrarProductoDelCarrito} = require('../logica_negocio.js')


//routerCarrito.use(express.json());
//routerCarrito.use(express.urlencoded({ extended: true }))



routerCarrito.post('/', async (req, res) => {     
    
    id_carrito = await crearCarrito();
    res.json({mensaje: `Nuevo carrito con id ${id_carrito} creado`});
 
})

routerCarrito.delete('/:id', async (req, res) => {     
    
    id_carrito = await borrarCarrito(req.params.id);
    res.json({mensaje: ` Carrito con id ${req.params.id} eliminado`});
 
})



routerCarrito.get('/:id/productos', async(req, res) => {
    let catalogo;
    catalogo = await obtenerProductosCarrito(req.params.id);
    if(catalogo){
        res.json(catalogo);
    } else {
        res.json({mensaje: `No hay productos en carrito ${req.params.id}`});
    }
        
})

routerCarrito.post('/:id/productos', async (req, res) => {
        
    const carrito_modificado= await agregarProductoAlCarrito(req.params.id, req.body);
    if(carrito_modificado){
        res.json(carrito_modificado);
    } else {
        res.json({mensaje: `No existe el carrito ${req.params.id}`});
    }
})


routerCarrito.delete('/:id/productos/:id_prod', async (req, res) => {
       
    carrito = await borrarProductoDelCarrito(req.params.id, req.params.id_prod)
    if(carrito){
    res.json({mensaje: `Producto ${req.params.id_prod} del carrito ${req.params.id} eliminado`})
    } else { 
        res.json({mensaje: `Producto ${req.params.id_prod} en carrito Carrito ${req.params.id} no existe`});

    }
})






module.exports = routerCarrito;