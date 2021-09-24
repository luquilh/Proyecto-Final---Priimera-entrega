const Contenedor = require('./contenedores/Contenedor.js')
const productos = new Contenedor('./productos.txt');
const carritos = new Contenedor('./carritos.txt');

async function obtenerProductos() {
    let catalogo=[];
    catalogo = await productos.getAll();
    return catalogo;
}

async function obtenerProductoPorId(id) {
    let producto;
    producto = await productos.getById(id);
    return producto;


}

async function agregarProducto(prod) {
    let id;
    id = await productos.save(prod);
    return id;
}

async function actualizarProducto(id, nuevo) {
    let anterior;
    anterior = await productos.changeById(id, nuevo);
    return anterior;
}

async function borrarProducto(id) {
    await productos.deleteById(id);
}



async function crearCarrito() {
    let id;
    id = await carritos.save({productos: []});
    
    return id;
}

async function borrarCarrito(id) {
    carritos.deleteById(id);
    
}

async function obtenerProductosCarrito(id) {
    carrito= await carritos.getById(id)
    if(carrito){
    return carrito.productos;
    } else {
        return null
    }
     
    
    
}




async function agregarProductoAlCarrito(id_carrito, prod){
    carrito= await carritos.getById(id_carrito);
    if(carrito){
    prod.id = carrito.productos.length > 0 ? carrito.productos[carrito.productos.length-1].id + 1 : 1;
    
    prod.timestamp = Date.now();
    carrito.productos.push(prod);
    carritos.changeById(id_carrito, carrito);
    return carrito;
    } else {
        return null;
    }
    

    


}

async function borrarProductoDelCarrito(id_carrito, id_prod){
    carrito= await carritos.getById(id_carrito);
    //carrito.productos
    if(carrito.productos.some( elem => elem.id ==id_prod )){

        const index = carrito.productos.findIndex( elem => elem.id == id_prod);
        carrito.productos.splice(index,1);
        carritos.changeById(id_carrito, carrito);
        return carrito
        
    } else {
        return null;
    }
    

}

module.exports= {obtenerProductos, obtenerProductoPorId, agregarProducto, actualizarProducto, borrarProducto, crearCarrito, borrarCarrito, obtenerProductosCarrito, agregarProductoAlCarrito, borrarProductoDelCarrito };
