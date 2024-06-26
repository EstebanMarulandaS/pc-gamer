let carrito = []
let valorActualDolar=0
let lista = document.getElementById("milista")

/* consumimos API de Dolar */
await obtenerValorDolar().then(a=>{valorActualDolar=a
})

async function obtenerValorDolar() {
    const apiDeDolar = "https://trm-colombia.vercel.app/?date=2024-04-09";
    try {
        const resp = await fetch(apiDeDolar);
        if (!resp.ok) {
            throw new Error("Error al obtener los datos del dólar");
        }
        const factorDolar = await resp.json();
        return factorDolar.data.value
        
    } catch (error) {
        console.error("Error al obtener el valor del dólar:", error);
    
        return null; 
    }
}

 
//llamada a renderizar
renderizarProductos();

/* --------------------------- */
  function renderizarProductos() {
    for (const producto of productos) {
        lista.innerHTML += `<li class="col-sm-3 list-group-item">
            <h2>${producto.nombre}</h2>
            <h4><strong> $ ${producto.precio} USD </strong></h4>
            <h4><strong> $ ${producto.precio*valorActualDolar} COP </strong></h4>
            <img src=${producto.foto} width="300" height="fit-content">
            <button class='btn btn-secondary' id='btn${producto.id}'>Comprar</button>
        </li>`;
    }
    //eventos boton
    productos.forEach((producto) => {
        //evento para cada boton         
        let btnAgregarAlCarrito = document.getElementById(`btn${producto.id}`)
        btnAgregarAlCarrito.addEventListener("click", function () {
            agregarAlCarrito(producto);
            swal({
                title: "Agregaste un producto al carrito!",
                text: `${producto.nombre}`,
                icon: "success",
        
                buttons: ["cerrar", "Ir al carrito"],
            }).then((irACarrito) => {
        
                if (irACarrito) {
                    //swal("Vamos al carrito!");
                    const myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
                    const modalToggle = document.getElementById('toggleMyModal');
                    myModal.show(modalToggle);
        
                }
            });

        });
    });   

}


/* funcion calcular Precio final */

function calculcarPrecioFinalCarrito() {
    let totalCarritoCompra = 0;
    carrito.forEach((producto) => {
        totalCarritoCompra += producto.precioFinal
    })
    return totalCarritoCompra
}

/* calculamos precio final en COP */
function calculcarPrecioFinalCarritoCOP() {
    let totalCarritoCompra = 0;
    carrito.forEach((producto) => {
        totalCarritoCompra += producto.precioFinal * valorActualDolar
    })
    return totalCarritoCompra
}

/* Funcion para dibujar el tfoot con el precio final */
function dibujarPrecioFinal() {
    document.getElementById("tablafoot").innerHTML = `
       <tfoot>
           <tr>
               <td> 
                   Precio Final:
               </td>
   
               <td>
                   ${calculcarPrecioFinalCarrito()} USD
               </td>

               <td>
                   ${calculcarPrecioFinalCarritoCOP()} COP
               </td>
    
           </tr>
       </tfoot>
      
      `
      /* Evalua si el carrito esta vacio */
      if(carrito.length == 0){
        document.getElementById("tablafoot").innerHTML = `Comienza a comprar`;
        document.querySelector("#modal-foot").innerHTML = `Carrito Vacio`;
        document.getElementById("tablaPrincipal").innerHTML="";
        
        }
        /*Si el carrito no esta vacio, dibuja los botones Cerrar Y finalizar compra  */
        else if(carrito!=0){
          document.querySelector("#modal-foot").innerHTML = `
          <div>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <a href="/pages/confirmacion-de-compra.html"><button class="btn btn-primary">Finalizar compra</button></a>
  
          </div>
          `;
          /* Dibujamos el t head */
          document.getElementById("tablaPrincipal").innerHTML=`  
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Total USD</th>
                <th scope="col">Total COP</th>
            </tr>     
          `;     
          
        }    
}

    /* Condicion para que al cargar la pagina no muestre el table foot */
    if(carrito.length == 0){
    
        document.querySelector("#modal-foot").innerHTML = `Comience a comprar`;
         

    }
 
/* ------------------------------------------ */
function agregarAlCarrito(producto) {    
    
    /* Funcion de orden superior para sweet alert */
    carrito.forEach((el) => {
        if (el.id == producto.id) {
            swal({
                title: "Ya agregaste este producto al carrito!",
                text: `${producto.nombre}`,
                icon: "warning",
                buttons: ["cerrar", "Ir al carrito"],
            }).then((irACarrito) => {

                if (irACarrito) {
                    //swal("Vamos al carrito!");
                    const myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
                    const modalToggle = document.getElementById('toggleMyModal');
                    myModal.show(modalToggle);

                }
            });
            reset;
        }
        
    })

    /* Push de productos en el carrito */
    carrito.push(producto);
    /* Asignacion del valor a nuestra propiedad producto.cantidad */
    producto.cantidad = 1;

   
    //agrego una fila nueva a la tabla body
    document.getElementById("tablabody").innerHTML += `
        <tr id="fila${producto.id}">
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td><input type="number" id="cantidad-producto-${producto.id}" value = "${producto.cantidad}"min="1" max="1000" style="width: 50px;"></input></td>
            <td id="valorActual${producto.id}">${producto.precio}</td>
            <td id="valorActualCOP${producto.id}">${producto.precio * valorActualDolar}</td>
            <td id="div-btn-eliminar"><button class="btn_eliminar" id="eliminar-producto-${producto.id}" style="--bs-btn-padding-y: 10px; --bs-btn-padding-x: 10px; class="btn btn-outline-danger" ><i class="fa-solid fa-trash fa-lg"></i></i></button></td>             
        </tr>
    `;

    /*Asignacion del valor a la propiedad producto.precio final  */

    producto.precioFinal = producto.precio * producto.cantidad
      
    /*Asignacion del valor a la propiedad producto.precio final EN COP  */

      producto.precioFinalCOP = producto.precio * producto.cantidad * valorActualDolar
    
    /* Funcion que dibuja el precio final al primer click */
    dibujarPrecioFinal()


    /* modifico dinamicamente el total del producto que agregue */
    carrito.forEach((producto) => {
        let valorInput = document.getElementById(`cantidad-producto-${producto.id}`);
        valorInput.addEventListener("change", () => {
            producto.cantidad = valorInput.value
            /* Calculo precio Final */
            let nuevoPrecio = producto.precio * valorInput.value
            producto.precioFinal = nuevoPrecio
            document.getElementById(`valorActual${producto.id}`).innerHTML = `
        <td id="cantidad-producto-${producto.id}">${nuevoPrecio}</td>
    `
    /* Calculo precio individual total en COP */

    let nuevoPrecioCOP = producto.precio * valorInput.value * valorActualDolar
    console.log(nuevoPrecioCOP)
            producto.precioFinalCOP = nuevoPrecioCOP
            document.getElementById(`valorActualCOP${producto.id}`).innerHTML = `
        <td id="cantidad-producto-${producto.id}">${nuevoPrecioCOP}</td>
    `
            dibujarPrecioFinal()

        })
    })

    /* Local Storage de los productos que agrego al carrito */

    localStorage.setItem("carrito", JSON.stringify(carrito))

    /* Boton eliminar producto */

    carrito.forEach((producto) => {
        let btnEliminarProducto = document.getElementById(`eliminar-producto-${producto.id}`)
        btnEliminarProducto.addEventListener("click", () => {
            /* document.getElementById(`fila${producto.id}`).innerHTML = ""; */ //preguntar por que crea confilcto al cambiar el valor del input y darle click a eliminar
            eliminarProducto(producto);
            dibujarPrecioFinal();

        })
    })
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

/* Funcion Eliminar productos */
function eliminarProducto(producto) {
    let productoAconservar = carrito.filter((productoActual) => productoActual.id != producto.id);
    carrito.length = 0;
    document.getElementById(`fila${producto.id}`).innerHTML = "";
    productoAconservar.forEach((productoAgregar) => carrito.push(productoAgregar))
    //Condicional ternario
    carrito.length == 0 ? (document.getElementById("tablabody").innerHTML = ``) : ""
        
    
    localStorage.setItem("carrito", JSON.stringify(carrito))
}


    /* Renderizacion de productos en el carrito guardados en el local storage */
    let carritoDeStorage = JSON.parse(localStorage.getItem("carrito"))
    carritoDeStorage != null ?(carritoDeStorage.forEach((producto)=>{agregarAlCarrito(producto)})) : "" 
    //condicional ternario



  

   





