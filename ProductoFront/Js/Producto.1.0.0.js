function ObtenerProductos() {
    fetch("http://localhost:5093/api/Producto")
        .then((respuesta) => respuesta.json())
        .then((data) => {
            console.log(data);
            mostrarProducto(data);
        })
        .catch((error) => {
            console.log(error);
        });

}
function mostrarProducto(data) {

    const tbody = document.getElementById("tablaProducto");
    tbody.innerHTML = "";

    data.forEach((element) => {
        let tr = tbody.insertRow();

        tr.insertCell(0).innerHTML = element.nombres;

        tr.insertCell(1).innerHTML = element.descripcion;

        tr.insertCell(2).innerHTML = element.precioCosto;

        tr.insertCell(3).innerHTML = element.precioVenta;

        let editar = document.createElement("button");
        editar.textContent = "Editar";
        editar.classList.add("btn", "btn-primary");

        editar.setAttribute(
            "onclick",
            `BuscarValoresProducto(${element.productoId})`,
        );

        let tdEditar = tr.insertCell(4);
        tdEditar.appendChild(editar);
    });

}
function AgregarProducto() {
    var nuevoProducto = {
        nombres: document.getElementById("nombreProducto").value,
        descripcion: document.getElementById("descripcionProducto").value,
        precioCosto: document.getElementById("precioCosto").value,
        precioVenta: document.getElementById("precioVenta").value
    };

// VALIDACIONES COMPLETAR CAMPOS

    if(nuevoProducto.nombres === ""){
      alert("Debe completar el campo 'Nombre'.");
    return;}

    if(nuevoProducto.descripcion === ""){
      alert("Debe completar el campo 'Descripcion'.");
    return;}

    if(nuevoProducto.precioCosto === ""){
      alert("Debe completar el campo 'Precio Costo'.");
    return;}

    if(nuevoProducto.precioVenta === ""){
      alert("Debe completar el campo 'Precio Venta'.");
    return;}

    fetch("http://localhost:5093/api/Producto", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoProducto)
    })
    .then((respuesta) => {
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        return respuesta.text();
    })
    .then((data) => {
        console.log(data);

        document.getElementById("nombreProducto").value = "";
        document.getElementById("descripcionProducto").value = "";
        document.getElementById("precioCosto").value = "";
        document.getElementById("precioVenta").value = "";
        ObtenerProductos();
    })
    .catch((error) => {
        console.error(error);
    });
}

function BuscarValoresProducto(id) {
  fetch(`http://localhost:5093/api/Producto/${id}`)
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
      }
      return respuesta.json();
    })
    .then((data) => {
      console.log("Producto:", data);

      document.getElementById("idEditar").value = data.productoId;
      document.getElementById("nombreEditar").value = data.nombres;
      document.getElementById("descripcionEditar").value = data.descripcion;
      document.getElementById("precioCostoEditar").value = data.precioCosto;
      document.getElementById("precioVentaEditar").value = data.precioVenta;

      let modal = new bootstrap.Modal(
        document.getElementById("modalEditar"),
      );

      modal.show();
    })
    .catch((error) => {
      console.error("No se pudo acceder a la API:", error);
    });
}



function EditarProducto() {
  let id = document.getElementById("idEditar").value;

  let editarProducto = {
    productoId: parseInt(id),
    nombres: document.getElementById("nombreEditar").value,
    descripcion: document.getElementById("descripcionEditar").value,
    precioCosto: parseFloat(document.getElementById("precioCostoEditar").value),
    precioVenta: parseFloat(document.getElementById("precioVentaEditar").value)
  };

  fetch(`http://localhost:5093/api/Producto/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editarProducto),
  })
    .then(() => {
      document.getElementById("idEditar").value = 0;
      document.getElementById("nombreEditar").value = "";
      document.getElementById("descripcionEditar").value = "";
      document.getElementById("precioCostoEditar").value = 0;
      document.getElementById("precioVentaEditar").value = 0;

      let modal = bootstrap.Modal.getOrCreateInstance(
        document.getElementById("modalEditar"),
      );

      modal.hide();
      ObtenerProductos();
    })
    .catch((error) => console.error("No se pudo editar el Producto.", error));
}


ObtenerProductos();

