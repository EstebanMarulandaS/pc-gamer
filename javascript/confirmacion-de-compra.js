 let carritoDeStorage = JSON.parse(localStorage.getItem("carrito"))
console.log(carritoDeStorage)


 
if(carritoDeStorage != null){
    carritoDeStorage.forEach( (producto)=> {
        document.getElementById("tbody").innerHTML+=`
        <tr id="fila${producto.id}">
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td><input type="number" id="cantidad-producto-${producto.id}" value = "${producto.cantidad}"min="1" max="1000" style="width: 50px;"></input></td>
            <td id="valorActual${producto.id}">${producto.precio}</td>             
        </tr>
    `
    });
}

















