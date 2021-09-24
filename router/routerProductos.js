const express = require('express');
const {Router}= express;
const routerProductos = new Router();

const {obtenerProductos, obtenerProductoPorId, agregarProducto, actualizarProducto, borrarProducto} = require('../logica_negocio.js')



//routerProductos.use(express.json());
//routerProductos.use(express.urlencoded({ extended: true }))

let administrador=true;

function adminAuthorization(req, res, next){

    if(administrador){
        next()
    } else {
        res.send({ error : -1, descripcion: `Acceso a ruta ${req.baseUrl}${req.path} con método ${req.method}  no autorizado`})
    }
    
}


routerProductos.get('/', async (req, res) => {
    let catalogo =[];
    catalogo = await obtenerProductos();
    res.json(catalogo);
    
})

routerProductos.get('/:id', async (req, res) => {
    let prod;
    prod = await obtenerProductoPorId(req.params.id);
    if(prod){
        res.json(prod);
    } else {
        res.json({ error : 'producto no encontrado'});
    }
            
    })


routerProductos.post('/', adminAuthorization, async (req, res) => {
    let id;
    const prod = req.body;
    id = await agregarProducto(prod)
    prod.id=id;
    res.json(prod);
    })


routerProductos.put('/:id',adminAuthorization, async (req, res) => {
    const id = req.params.id;
    const nuevo = req.body;
    anterior = await actualizarProducto(id, nuevo)
    if(anterior){
        res.json({nuevo, anterior});
    } else {
        res.send(`No existe producto con id: ${id}`);
    }
})



routerProductos.delete('/:id',adminAuthorization ,async(req, res) => {
    const id = req.params.id;
    await borrarProducto(id);
    res.send(`Elemento con id ${id} borrado`)
});



module.exports = routerProductos;