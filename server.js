const express = require('express')
const routerProductos = require('./router/routerProductos.js')
const routerCarrito = require('./router/routerCarrito.js')


const app= express();
const PORT= process.env.PORT || 8080;

const administrador = false;


app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);
app.use((req, res, next) => {
    res.send({ error : -2, descripcion: `Ruta ${req.baseUrl}${req.path} con método ${req.method} no implementada`});
});


/*----------- Inicializaciònd e servidor ---------------*/



const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error de servidor: ${error}`));