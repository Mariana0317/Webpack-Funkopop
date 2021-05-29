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
function limpiarFormulario(){
  let formulario = document.getElementById('formProducto');
  formulario.reset();
}
//funcion que lee el arreglo del localstorage para que se guarden todos los productos y no se reemplazen
function leerProductos(){
  if(localStorage.length == 0){
    let _listaFunkos = JSON.parse(localStorage.getItem("funkoKey"));
    if(listaFunkos.length == 0){
      listaFunkos = _listaFunkos;
    }
  }
}