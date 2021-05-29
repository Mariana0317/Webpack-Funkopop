import "../css/style.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Funko from "./funko.js";
import "@fortawesome/fontawesome-free/js/all.min.js";

let listaFunkos = [];
//llamo a la funcion que me iguals el local storage con en el arrat


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
  
  //guardamos en localstorage
 
  //llamo a la funcion limpiar forumulario
  
};
//funcion que limpia el input

//funcion que lee el arreglo del localstorage para que se guarden todos los productos y no se reemplazen
