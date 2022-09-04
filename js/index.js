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

    renderProductos();
    actualizarBotonCarrito();