import "../css/style.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Funko from "./funko.js";
import "@fortawesome/fontawesome-free/js/all.min.js";
import $ from "jquery";
import Swal from "sweetalert2";

let listaFunkos = [];
//llamo a la funcion que me iguals el local storage con en el arrat
leerProductos();
//variable bandera esta en false cuando voy a agregar un nuevo porducto y true cuando edite un producto
let productoExiste = false;

//cramos la funcion para agregar un nuevo producto
window.agregarFunko = function () {
  let codigo = document.querySelector(".codigo").value;
  let nombre = document.querySelector(".nombre").value;
  let numSerie = document.querySelector(".numSerie").value;
  let categoria = document.querySelector(".categoria").value;
  let descripcion = document.querySelector(".descripcion").value;
  let imagen = document.querySelector(".imagen").value;
  let precio = document.querySelector(".precio").value;

  //aqui validar formulario
  validarForm();
  //vamos a crear un objeto a partir de la calse funko
  let nuevoFunko = new Funko(
    codigo,
    nombre,
    numSerie,
    categoria,
    descripcion,
    imagen,
    precio
  );
  listaFunkos.push(nuevoFunko);
  console.log(nuevoFunko);
  //guardamos en localstorage
  localStorage.setItem("funkoKey", JSON.stringify(listaFunkos));
  //llamo a la funcion limpiar forumulario
  limpiarFormulario();
  leerProductos();
  //cerramos modal
  let modal = document.querySelector("#exampleModal");
  $(modal).modal("hide");
  //sweet Alert
  Swal.fire(
    "Se agrego el nuevo funko!",
    "Tu producto se agrego exitosamente!",
    "success"
  );
};

//funcion que limpia el input
window.limpiarFormulario = function () {
  let formulario = document.querySelector("#formProducto");
  formulario.reset();
  productoExiste = false;
};
//funcion que lee el arreglo del localstorage para que se guarden todos los productos y no se reemplazen
function leerProductos() {
  if (localStorage.length > 0) {
    let _listaFunkos = JSON.parse(localStorage.getItem("funkoKey"));
    if (listaFunkos.length == 0) {
      listaFunkos = _listaFunkos;
    }
    //borramos los datos de la tabla para no se dupliquen aqui
    borrarTabla();
    //y volver a dibujar la tabla aqui llamo a la funcion
    dibujarTabla(_listaFunkos);
  }
}

//funcion para dibujar la tabla en y se muesten los productos en el frontEnd
function dibujarTabla(_listaFunkos) {
  //recibo como parametro el arreglo del local storage
  //traigo por el id la tabla

  let tablaFunko = document.querySelector("#tablaFunko");
  //creo la variable que va contener el html
  let codHTML = "";
  for (let i in _listaFunkos) {
    codHTML = `<tr>
   <th class="letras text-monospace" scope="row">${_listaFunkos[i].codigo}</th>
  <td class="letras text-monospace">${_listaFunkos[i].nombre}</td>
  <td class="letras text-monospace ">${_listaFunkos[i].numSerie}</td>
  <td class="letras text-monospace">${_listaFunkos[i].categoria}</td>
  <td class="letras text-monospace">${_listaFunkos[i].descripcion}</td>
  <td class="letras text-monospace">${_listaFunkos[i].imagen}</td>
  <td class="letras text-monospace">${_listaFunkos[i].precio}</td>
  
<td>
<button type="button" class="btn btn-outline-success btn-sm"
 
onclick="editarProducto(${_listaFunkos[i].codigo})" >
<i class="far fa-edit editar"></i></button>
<button type="button" class="btn btn-outline-danger btn-sm"
onclick="borrarProducto(this)" id=${_listaFunkos[i].codigo} >
<i class="fas fa-trash-alt eliminar">
</i></button>
</td>

   `;
    tablaFunko.innerHTML += codHTML;
  }
}
//funcion que borra un elemento de la tabla para que no se duplique
function borrarTabla() {
  let tablaFunko = document.querySelector("#tablaFunko");
  //le preguntamos al elemento padre si teien hijos
  if (tablaFunko.children.length > 0) {
    while (tablaFunko.firstChild) {
      tablaFunko.removeChild(tablaFunko.firstChild);
    }
  }
}
//funcion que elimina un producto de la tabla
window.borrarProducto = function (botonEliminar) {
  console.log(botonEliminar);
  if (localStorage.length > 0) {
    let _listaFunkos1 = JSON.parse(localStorage.getItem("funkoKey"));
    Swal.fire({
      title: "Estas seguro de eliminar el producto?",
      text: "Esta acción es irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6ddccf",
      cancelButtonColor: "#ffcb91",
      confirmButtonText: "Si, quiero borrarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        let datosFiltrados = _listaFunkos1.filter(function (funkoItem) {
          return funkoItem.codigo != botonEliminar.id;
        });
        //actualizo el localStorage con el funko ya eliminado
        localStorage.setItem("funkoKey", JSON.stringify(datosFiltrados));
        //y vuelvo a pintar la tabla actualizada
        leerProductos();
        listaFunkos = datosFiltrados;
        Swal.fire(
          "Funko eliminado!",
          "Su producto ha sido eliminado con exito.",
          "success"
        );
      } else {
        Swal.fire("Cancelado!", "Tu producto esta a salvo.", "info");
      }
    });
  }
};

//funcion para editar un producto
window.editarProducto = function (codigo) {
  console.log(codigo);
  let productoEncontrado = listaFunkos.find(function (itemProducto) {
    return itemProducto.codigo == codigo; //dos signos igual si o si sino no funciona
  });
  console.log(productoEncontrado);
  //cargar los datos en la ventana modal
  document.querySelector(".codigo").value = productoEncontrado.codigo;
  document.querySelector(".nombre").value = productoEncontrado.nombre;
  document.querySelector(".numSerie").value = productoEncontrado.numSerie;
  document.querySelector(".categoria").value = productoEncontrado.categoria;
  document.querySelector(".descripcion").value = productoEncontrado.descripcion;
  document.querySelector(".imagen").value = productoEncontrado.imagen;
  document.querySelector(".precio").value = productoEncontrado.precio;

  let modal = document.querySelector("#exampleModal");
  $(modal).modal("show");

  productoExiste = true;
};

//funcion para desabilitar editar el codigo
/*function desabilitarCodigo() {
  if (productoExiste == true) {
    console.log(codigo);
  }
}*/

//funcion que se encarga de saber cuando es modo editar y cuando modo agregar nuevo producto
window.agregarModificar = function (event) {
  event.preventDefault();
  //si la variable bandera es falsa quiero agregar un nuevo producto
  if (productoExiste == false) {
    agregarFunko();
  } else {
    Swal.fire({
      title: "Seguro que quieres modificar el producto?",
      text: "Esta acción es irreversible!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#6ddccf",
      cancelButtonColor: "#ffcb91",
      confirmButtonText: "Si, quiero modificarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Producto modificado!",
          "Tu producto ha sido modificado con exito.",
          "success"
        );
      }
    });
    validarForm();
    guardarProducto();
  }
};
//funcion que gurada el producto
function guardarProducto() {
  console.log("gurado producto");

  let codigo = document.querySelector(".codigo").value;
  let nombre = document.querySelector(".nombre").value;
  let numSerie = document.querySelector(".numSerie").value;
  let categoria = document.querySelector(".categoria").value;
  let descripcion = document.querySelector(".descripcion").value;
  let imagen = document.querySelector(".imagen").value;
  let precio = document.querySelector(".precio").value;

  for (let i in listaFunkos) {
    if (listaFunkos[i].codigo == codigo) {
      listaFunkos[i].nombre = nombre;
      listaFunkos[i].numSerie = numSerie;
      listaFunkos[i].categoria = categoria;
      listaFunkos[i].descripcion = descripcion;
      listaFunkos[i].imagen = imagen;
      listaFunkos[i].precio = precio;
    }
  }
  localStorage.setItem("funkoKey", JSON.stringify(listaFunkos));
  leerProductos();
  limpiarFormulario();

  //cerramos modal
  let modal = document.querySelector("#exampleModal");
  $(modal).modal("hide");
}


//funcion validar formulario

window.validarForm = function (input) {
  /* let codigo = document.querySelector(".codigo");
  let nombre = document.querySelector(".nombre");
  let numSerie = document.querySelector(".numSerie");
  let categoria = document.querySelector(".categoria");
  let descripcion = document.querySelector(".descripcion");
  let imagen = document.querySelector(".imagen");
  let precio = document.querySelector(".precio");*/

  if (input.value === "") {
    input.className = "form-control is invalid";
  } else {
    input.className = "form-control is valid";
  }
};
