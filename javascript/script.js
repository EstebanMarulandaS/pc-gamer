let carrito=[];


let lista=document.getElementById("milista");
    
//llamada a renderizar
renderizarProductos();

function renderizarProductos() {
    for (const producto of productos) {
        lista.innerHTML+=`<li class="col-sm-3 list-group-item">
            <h2>${producto.nombre}</h2>
            <h4><strong> $ ${producto.precio} </strong></h4>
            <img src=${producto.foto} width="300" height="fit-content">
            <button class='btn btn-secondary' id='btn${producto.id}'>Comprar</button>
        </li>`;
    }
    //eventos boton
    productos.forEach(producto => {
        //evento para cada boton
        document.getElementById(`btn${producto.id}`).addEventListener('click',function(){
            agregarAlCarrito(producto);
        });
    });
}

function agregarAlCarrito(producto){
    carrito.push(producto);
    
    let cantidad = 1;
    
    //agrego una fila nueva a la tabla body
    document.getElementById("tablabody").innerHTML+=`
        <tr>
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td><input type="number" id="cantidad-producto-${producto.id}" value = "${cantidad}"min="1" max="1000" style="width: 50px;"></input></td>
            <td>${producto.precio}</td>
            <td id="total"></td>
        </tr>
    `;
   /* modifico dinamicamente el total del carrito */
    let valorInput = document.getElementById(`cantidad-producto-${producto.id}`);
    valorInput.addEventListener("change", () => {

        carrito.forEach((el)=>{
            if(el.id == producto.id){
                let nuevoPrecio = producto.precio*valorInput.value;
                document.getElementById("tablabody").innerHTML+= `
                <tr>
                    <td>${document.getElementById.innerHTML = nuevoPrecio}</td>
                </tr>
                `
                console.log(nuevoPrecio);
            }
        })
    

})



    /* Sweet alert */
     swal({
        title: "Agregaste un producto al carrito!",
        text: `${producto.nombre}`,
        icon: "success",
        button: "Cerrar",
      });
 
}

/* ToTopBtn */
const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
})

//agregar un boton de FINALIZAR COMPRA: funcional con mensaje al usuario.
//calcular total acumulado
//poder eliminar productos del carro y recalcular total



