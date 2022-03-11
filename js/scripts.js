
const Clickbutton = document.querySelectorAll('.button')
const tbody = document.querySelector('tbody')
let carrito = []




//FUNCIONALIDAD AL BOTON "AÑADIR AL CARRITO"
//recorremos todos los botones
// Cada vez que hagan click en ese boton quiero añadir ese item al carrito (addToCarritoItem)

Clickbutton.forEach(btn => { 
    btn.addEventListener('click', addToCarritoItem)
})

//"addToCarritoItem" esta funcion viene con un evento por defecto ("e")
// VAMOS A VISUALIZAR AL BOTON SOBRE EL CUAL SE HIZO CLICK --->me dará el boton con todas las clases y el contenido que tenga.
// "item" para saber particularmente que boton es el que se apreto.
// "button.closest('.card')" ---->obtené el contenedor que tenga la clase mas cercana a "card"... y en éste caso, el que tiene eso, es el contenedor padre de mi producto.

function addToCarritoItem(e){
const button = e.target
const item = button.closest('.card')
console.log(item)
}


// GUARDAR EN UNA MATRIZ ESA INFORMACION
// declara al inicio "let carrito = []"


// creamos "newItem" para pasarlo por la funcion 
// pasamos el nuevo carrito a traves de la nueva funcion "addItemCarrito(newItem)"... que la llama aca pero la crea despues mas abajo.

function addToCarritoItem(e){
    const button = e.target
    const item = button.closest('.card')
    const itemTitle = item.querySelector('.card-title').textContent;
    const itemPrice = item.querySelector('.precio').textContent;
    const itemImg = item.querySelector('.card-img-top').src;  

//---------------------- ESTO SERIA EL NUEVO CARRITO-------------------
        const newItem = {
            title: itemTitle,
            precio: itemPrice,
            img: itemImg,
            cantidad: 1
        }

    addItemCarrito(newItem)
}


// en "carrito.push(newItem)" lo que hace es que, dentro de la matriz global "let carrito = []" va ir guardando cada nuevo item
// y despues lo manda a que se vea en la pantalla, en la pagina de carrito, utilizando  "renderCarrito"
// --> "trim()" --> quita los espacios a los lados y esto garantiza que esten iguales

function addItemCarrito(newItem){

    const InputElemento = tbody.getElementsByClassName('input__elemento')

        for(let i=0; i < carrito.length; i++ ){
            if(carrito[i].title.trim() === newItem.title.trim()){ 
                carrito[i].cantidad ++;

                const inputValue = InputElemento[i]
                inputValue.value++;

                CarritoTotal() //esta linea la creo al final y la manda a llamar aqui y cuando el producto se renderiza
                return null; 
            }
        }
        carrito.push(newItem)
        renderCarrito()
}

// --- return null ----> se sale de la funcion principal (addItemCarrito) y no ejecuta "carrito.push(newItem)" ni "renderCarrito()"



// Para renderizar en la pag carrito, le pone en el HTML una clase a tbody---> 'class= "tbody"'
// Para poder obtenerlo como variable global (declara al principio la variable " " ) porque se usará muchas veces.

function renderCarrito(){

    tbody.innerHTML = ' '

        carrito.map(item =>{
            const tr = document.createElement('tr')
            tr.classList.add ('itemCarrito')
            
            const Content = `

                    <th scope="row">1</th>
                    <td class="table__productos">
                        <img src= ${item.img} alt="">
                        <h6 class="title"> ${item.title}</h6>
                    </td>
                    <td class="table__precio"> 
                        <p>${item.precio}</p> 
                    </td>
                    <td class="table__cantidad">
                        <input type="number" min="1" value= ${item.cantidad} class="input__elemento" >
                        <button class="delete btn btn-danger"> x </button>
                    </td>

            `
            tr.innerHTML = Content;
            tbody.appendChild(tr)

            tr.querySelector('.delete').addEventListener('click', removeItemCarrito)

        })
        CarritoTotal()
}



// A travez de "Number(item.precio.replace("$", ' ')".... le saca el simbolo $ al item precio... para volverlo un valor numerico.. para realizar la operacion matematica 
function CarritoTotal(){
    
    let Total = 0;
    
    const itemCartTotal = document.querySelector ('.itemCartTotal')
    
        carrito.forEach((item) => {
            const precio = Number(item.precio.replace("$", ' '))
            Total = Total + precio* item.cantidad
        })
        
        itemCartTotal.innerHTML = `Total $${Total}`
}





// "ItemCarrito" es el componente padre del boton "buttonDelete"
// --> "trim()" --> quita los espacios a los lados y esto garantiza que esten iguales

function removeItemCarrito (e){
    const buttonDelete = e.target
    const tr = buttonDelete.closest('.ItemCarrito')
    const title = tr.querySelector('.title').textContent

        for(let i=0; i<carrito.length; i++){
            if(carrito[i].title.trim() === title.trim()){
                carrito.splice(i, 1)
            }
        }

    tr.remove()
}


