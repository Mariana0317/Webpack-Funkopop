import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/style.css";
import "@fortawesome/fontawesome-free/js/all.min.js";


//LLAMARA SIEMPRE A LA FUNCION!!!!
leerLocalStorage();

function leerLocalStorage() {
  if (localStorage.length > 0) {
    let listaCatalago = JSON.parse(localStorage.getItem("funkoKey"));
    let catalogo = document.getElementById("catalogo");

    for (let i in listaCatalago) {
      let cardHTML = `
            <div class="col-sm-12 col-md-4 col-lg-3 ">
          <div class="card my-2 mx-1 shadow-lg rounded" >
            <img src="./img/productos/${listaCatalago[i].imagen}" class="card-img-top imagenCard rounded" alt=${listaCatalago[i].nombre}>
            <div class="card-body">
              <h5 class="card-title titucard text-uppercase text-center">${listaCatalago[i].nombre} </h5>
              <p class="card-text titucard text-center text-capitalize text-monospace">${listaCatalago[i].categoria} </p>
              <p class="card-text titucard text-center text-monospace">${listaCatalago[i].precio} </p>
              <hr>
              <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn me-md-2" type="button"><i class="fas fa-shopping-cart editar"></i></button>
                <button class="btn " type="button"><i class="fas fa-info eliminar"></i></button>
              </div>
            </div>
          </div>
        </div>
        `;
      catalogo.innerHTML += cardHTML;
    }
  }
}
