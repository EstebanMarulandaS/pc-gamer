class Producto{
    constructor(nombre, precio,isbn,stock){
        this.nombre = nombre;
        this.precio = precio;
        this.isbn = isbn;
        this.stock = stock;
    }
     
}

const productos = []; 

productos.push(new Producto("PC GAMER", 2000, "98741236", 100))
productos.push(new Producto("TARJETA DE VIDEO", 1000, "23698514", 150))
productos.push(new Producto("DISCO DURO", 500, "52847630", 200))
productos.push(new Producto("MEMORIA RAM", 800, "45142567", 120))
productos.push(new Producto("MONITORES", 1500, "82541030", 80))
productos.push(new Producto("TECLADOS", 600, "42163587", 130))
productos.push(new Producto("SISTEMA DE REFRIGERACION", 800, "69853617", 150))
productos.push(new Producto("MOUSE", 200, "85201475", 250))
productos.push(new Producto("SILLA", 650, "874261", 160))

function filtrarProductos(){

    const productosFiltrados = prompt("ingrese el producto a buscar").toUpperCase()
    const encontrarProducto = productos.filter((el)=>el.nombre.includes(productosFiltrados))
    
    let {nombre, precio,stock} = encontrarProducto[0];
    console.table({nombre, precio,stock})  
   
}
/* filtrarProductos()  */

/*funcion para sumar la cant de productos seleccionados  */
/* 1)preguntar que producto comprar
    2) preguntar cant de producto
    3) multiplicar cant por precio
    4) calcular precio final de la compra*/
    function ComprarYDescontarStock(){
    
        const productoSeleccionado = prompt("Ingresa el producto que desea comprar").toUpperCase()
        const productoSeleccionadoCant = parseInt(prompt("Ingresa la cantidad de elementos que quieres comprar"))
        
        function comprarProducto (){
            let iva = 1.19
            const filtrarProducto = productos.filter((el)=>el.nombre == productoSeleccionado)
            console.log(filtrarProducto)
            let {precio} = filtrarProducto[0];
            const precioFinal = precio * productoSeleccionadoCant * iva
            console.log(precioFinal)
        }
        comprarProducto () 
        
        
/* Funcion que descuenta el stock por cada compra 
    1) preguntar al usuario si confirma o cancela la compra
    2) Evaluar si confirma la compra y restar el stock en caso de true*/

         function descontarStock(){
            const confirmarCompra = confirm("Deseas confirmar la compra?")
            
            for(let i = 0; i < productos.length; i++){
                if(productoSeleccionado == productos[i].nombre){
                    if(confirmarCompra == true){
                        let {stock} = productos[i];
                        let nuevoStock = stock - productoSeleccionadoCant
                        console.log(nuevoStock)
        
                    }
                }
            }
            
        }
        descontarStock()
    }
    ComprarYDescontarStock()

 




