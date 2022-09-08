let carritoDeStorage = JSON.parse(localStorage.getItem("carrito"))
console.log(carritoDeStorage)



function calculcarPrecioFinalCarrito() {
    let totalCarritoCompra = 0;
    carrito.forEach((producto) => {
        totalCarritoCompra += producto.precioFinal
    })
    return totalCarritoCompra
}

if(carritoDeStorage != null){
    carritoDeStorage.forEach((producto) => {
        document.getElementById("tbody").innerHTML+=`
        <tr id="fila${producto.id}">
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td><input type="number" id="cantidad-producto-${producto.id}" value = "${producto.cantidad}"min="1" max="1000" style="width: 50px;"></input></td>
            <td id="valorActual${producto.id}">${producto.precio}</td>
            <td id="div-btn-eliminar"><button class="btn_eliminar" id="eliminar-producto-${producto.id}" style="--bs-btn-padding-y: 10px; --bs-btn-padding-x: 10px; class="btn btn-outline-danger" ><i class="fa-solid fa-trash fa-lg"></i></i></button></td>           
        </tr>
        
        `
        /* modifico dinamicamente el total del producto que agregue */
        let valorInput = document.getElementById(`cantidad-producto-${producto.id}`);
        valorInput.addEventListener("change", () => {
            producto.cantidad = valorInput.value
            /* Calculo precio Final */
            let nuevoPrecio = producto.precio * valorInput.value
            producto.precioFinal = nuevoPrecio
            document.getElementById(`valorActual${producto.id}`).innerHTML = `
        <td id="cantidad-producto-${producto.id}">${nuevoPrecio}</td>
    `
        })

    });
    document.getElementById("tfoot").innerHTML+=`
        
        precio total:${nuevoPreciod}
        
        `

}



