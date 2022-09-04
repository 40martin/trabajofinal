function renderProductosCarrito() {
    const productos = cargarProductosCarrito();
    let contenido = "";

    if (productos.length == 0) {
        contenido = `<div class="alert alert-warning text-center" role="alert">No se encontro ningun producto en su carrito</div>`;
    } else {
        contenido += `<table class="table">
        <tr>
        <td class="text-end" colspan="6"><a href="#" class="btn btn-warning" title="Vaciar Carrito" onclick="vaciar carrito()">Vaciar
        Carrito <img src="images/descarga.png" width="50"></a></td>
        </tr>`;

        productos.forEach((producto) => {
            contenido += `<tr> 
        
            <td class="text-start"><img src="images/${producto.imagen}" alt="${producto.nombre}" width="50"></td>
        <td>${producto.nombre}</td>
        <td><b>$${producto.precio}</b></td>
        <td><a href="#" class="btn btn-warning" title="Eliminar Item" onclick="eliminarItem(${producto.id});">-</a> ${producto.
        cantidad} <a href="#" class="btn btn-warning" title="Agregar Item" onclick="agregarItem(${producto.id});">+</a></td>
        <td><b>$${producto.precio * producto.cantidad}</b></td>
        <td class="text-end"><a href="#" class="btn btn-warning" onclick="eliminarProducto(${producto.id});"><img src="images/descarga.png"
        alt="Eliminar" width="20" title="Eliminar Producto"></a></td>
        </tr>`;
        });

        contenido += `<tr>
        <td><b>Total a Pagar:</b></td>
        <td><b>$${totalAPagar()}</b></td>
        <td>&nbsp;</td>
        </tr>
        </table>`;
    }
    
    document.getElementById("productos").innerHTML = contenido;
}

renderProductosCarrito();
actualizarBotonCarrito();