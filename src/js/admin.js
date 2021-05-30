import "../css/style.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Funko from "./funko.js";
import "@fortawesome/fontawesome-free/js/all.min.js";
import $ from "jquery";

let listaFunkos = [];
//llamo a la funcion que me iguals el local storage con en el arrat
leerProductos();
//variable bandera esta en false cuando voy a agregar un nuevo porducto y true cuando edite un producto
let productoExiste = false;

//cramos la funcion para agregar un nuevo producto
window.agregarFunko = function () {
  let codigo = document.getElementById("codigo").value;
  let nombre = document.getElementById("nombre").value;
  let numSerie = document.getElementById("numSerie").value;
  let categoria = document.getElementById("categoria").value;
  let descripcion = document.getElementById("descripcion").value;
  let imagen = document.getElementById("imagen").value;
  let precio = document.getElementById("precio").value;

  //aqui validar formulario

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
  let modal = document.getElementById("exampleModal");
  $(modal).modal("hide");
};
//funcion que limpia el input
function limpiarFormulario() {
  let formulario = document.getElementById("formProducto");
  formulario.reset();
  productoExiste = false;
}
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
   <th scope="row">${_listaFunkos[i].codigo}</th>
  <td>${_listaFunkos[i].nombre}</td>
  <td>${_listaFunkos[i].numSerie}</td>
  <td>${_listaFunkos[i].categoria}</td>
  <td>${_listaFunkos[i].descripcion}</td>
  <td>${_listaFunkos[i].imagen}</td>
  <td>${_listaFunkos[i].precio}</td>
  
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
  let tablaFunko = document.getElementById("tablaFunko");
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
    let datosFiltrados = _listaFunkos1.filter(function (funkoItem) {
      return funkoItem.codigo != botonEliminar.id;
    });
    //actualizo el localStorage con el funko ya eliminado
    localStorage.setItem("funkoKey", JSON.stringify(datosFiltrados));
    //y vuelvo a pintar la tabla actualizada
    leerProductos();
    listaFunkos = datosFiltrados;
  }
};

//funcion para editar un producto
window.editarProducto = function (codigo) {
  console.log(codigo);
  let productoEncontrado = listaFunkos.find(function (itemProducto) {
    return (itemProducto.codigo == codigo);//dos signos igual si o si sino no funciona
  });
  console.log(productoEncontrado);
  //cargar los datos en la ventana modal
  document.querySelector("#codigo").value = productoEncontrado.codigo;
  document.querySelector("#nombre").value = productoEncontrado.nombre;
  document.querySelector("#numSerie").value = productoEncontrado.numSerie;
  document.querySelector("#categoria").value = productoEncontrado.categoria;
  document.querySelector("#descripcion").value = productoEncontrado.descripcion;
  document.querySelector("#imagen").value = productoEncontrado.imagen;
  document.querySelector("#precio").value = productoEncontrado.precio;

  let modal = document.getElementById("exampleModal");
  $(modal).modal("show");

  productoExiste = true;
};

//funcion para desabilitar editar el codigo
function desabilitarCodigo(){
  if(productoExiste == true){
    console.log(codigo);
  }
}

//funcion que se encarga de saber cuando es modo editar y cuando modo agregar nuevo producto
window.agregarModificar = function (event) {
  event.preventDefault();
  //si la variable bandera es falsa quiero agregar un nuevo producto
  if (productoExiste == false) {
    agregarFunko();
  } else {
    guardarProducto();
  }
};
//funcion que gurada el producto
function guardarProducto() {
  console.log("gurado producto");

  let codigo = document.getElementById("codigo").value;
  let nombre = document.getElementById("nombre").value;
  let numSerie = document.getElementById("numSerie").value;
  let categoria = document.getElementById("categoria").value;
  let descripcion = document.getElementById("descripcion").value;
  let imagen = document.getElementById("imagen").value;
  let precio = document.getElementById("precio").value;

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
  let modal = document.getElementById("exampleModal");
  $(modal).modal("hide");
}
