import "../css/style.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Funko from "./funko.js";
import "@fortawesome/fontawesome-free/js/all.min.js";

let listaFunkos = [];
//llamo a la funcion que me iguals el local storage con en el arrat
leerProductos();
//cramos la funcion para agregar un nuevo producto
window.agregarFunko = function (event) {
  event.preventDefault();
  let codigo = document.getElementById("codigo").value;
  let nombre = document.getElementById("nombre").value;
  let numSerie = document.getElementById("numSerie").value;
  let categoria = document.getElementById("categoria").value;
  let descripcion = document.getElementById("descripcion").value;
  let precio = document.getElementById("precio").value;
  let imagen = document.getElementById("imagen").value;

  //aqui validar formulario

  //vamos a crear un objeto a partir de la calse funko
  let nuevoFunko = new Funko(
    codigo,
    nombre,
    numSerie,
    categoria,
    descripcion,
    precio,
    imagen
  );
  listaFunkos.push(nuevoFunko);
  console.log(nuevoFunko);
  //guardamos en localstorage
  localStorage.setItem("funkoKey", JSON.stringify(listaFunkos));
  //llamo a la funcion limpiar forumulario
  limpiarFormulario();
  leerProductos();
};
//funcion que limpia el input
function limpiarFormulario() {
  let formulario = document.getElementById("formProducto");
  formulario.reset();
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
function dibujarTabla(_listaFunkos) {//recibo como parametro el arreglo del local storage
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
  <td>$${_listaFunkos[i].precio}</td>
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
