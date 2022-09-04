const productos = [
    {id:1, nombre:"Jugo HI-C Naranja Para Diluir 1,5 Lt", calorias:20, descripcion:"Jugo HI-C Naranja", imagen:"00528951.jpg", precio:500},

    {id:2, nombre:"Jugo Concentrado VIRARÓ Naranja Bidon 5 L", calorias:50, descripcion:"Bidon de jugo", imagen:"00115602.jpg", precio:1000},

    {id:3, nombre:"Jugo CEPITA DEL VALLE Fresh Naranja 1,5 Lt", calorias:10, descripcion:"Botella de jugo", imagen:"00495551.jpg", precio:600},

    {id:4, nombre:"Agua mineral sin gas botella x 2 LT bajo contenido de sodio", calorias:5, descripcion:"Botella de agua", imagen:"agua-mineral-sin-gas-botella-x-2-lt.--glaciar-47379.jpg", precio:240},

    {id:5, nombre:"Lavandina Ayudin clásica 4 Litros", descripcion:"Lavandina en botella", imagen:"00527730.jpg", precio:500},

    {id:6, nombre:"Yerba mate flex Taragui 500Gr", descripcion:"Paquete de yerba", imagen:"00499473.jpg", precio:300},

    {id:7, nombre:"Paquete de azucar Ledesma superior 1Kg", descripcion:"Paquete de azucar", imagen:"00218834.jpg", precio:200},

    {id:8, nombre:"Aceite de oliva virgen extra 500 ml", descripcion:"Lata de aceite", imagen:"00162778.jpg", precio:970},
];  

function guardarProductosLS(productos) {
    localStorage.setItem("productos", JSON.stringify(productos));
}

function cargarProductosLS() {
    return JSON.parse(localStorage.getItem("productos")) || [];
}

function guardarProductosCarrito(productos) {
    localStorage.setItem("productos_carrito", JSON.stringify(productos));
}

function cargarProductosCarrito() {
    return JSON.parse(localStorage.getItem("productos_carrito")) || [];
}

function buscarProducto(id) {
    const productos = cargarProductosLS();

    return productos.find(item => item.id === id);
}

function agregarProducto(id) {
    const productos_carrito = cargarProductosCarrito();
    let pos = productos_carrito.findIndex(item => item.id === id);

    if (pos > -1) {
        productos_carrito[pos].cantidad += 1;
    } else {
    const producto = buscarProducto(id);
    producto.cantidad = 1;
    productos_carrito.push(producto);
    }
    guardarProductosCarrito(productos_carrito);
    actualizarBotonCarrito();
}

function eliminarProducto(id) {
    const productos_carrito = cargarProductosCarrito();
    let pos = productos_carrito.findIndex(item => item.id === id);
    productos_carrito[pos].cantidad -= 1;

    if (productos_carrito[pos].cantidad == 0) {
        productos_carrito.splice(pos, 1);
    }

    guardarProductosCarrito(productos_carrito);
    renderProductosCarrito();
    actualizarBotonCarrito();
}

function agregarItem(id) {
    agregarProducto(id);
    renderProductosCarrito();
    actualizarBotonCarrito();
}

function eliminarItem(id) {
    eliminarProducto(id);
    renderProductosCarrito();
    actualizarBotonCarrito();
}

function actualizarBotonCarrito() {
    let total_Productos = totalProductos();

    if (total_Productos > 0) {
    let contenido = `<button type="button" class="btn btn-primary position-relative">
    <img src="images/descarga.png" alt="carrito" width="100">
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">${totalProductos()}</span>
    </button>`;
    document.getElementById("boton_carrito").innerHTML = contenido;
} else {
    document.getElementById("boton_carrito").innerHTML = "";
}
}

function vaciarCarrito() {
    localStorage.removeItem("productos_carrito");
    renderProductosCarrito();
    actualizarBotonCarrito();
}

function totalProductos() {
    const productos_carrito = cargarProductosCarrito();

    return productos_carrito.reduce((acumulador, item) => acumulador + item.cantidad, 0);
}

function totalAPagar() {
    const productos_carrito = cargarProductosCarrito();

    return productos_carrito.reduce((acumulador, item) => acumulador + (item.cantidad * item.precio), 0);
}

function renderProductos() {
    const productos = cargarProductosLS();
    let contenido = "";

    productos.forEach((producto) => {
        contenido += `<div class="col-md-3">
        <div class="card">
        <img src="images/${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body text-center">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">$${producto.precio}</p>
           <a href="#" class="btn btn-primary" onclick="agregarProducto(${producto.id})">Agregar (+)</a>
        </div>
        </div>
        </div>`;
    });

        document.getElementById("productos").innerHTML = contenido;
    }        

guardarProductosLS(productos);
