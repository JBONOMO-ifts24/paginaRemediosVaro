document.addEventListener("DOMContentLoaded", (event) => {
  mostrarDatos();
  console.log("Hola 🌎 !!!");
});

function guardarDatos() {
  const nombre = document.getElementById("nombre").value;
  const mensaje = document.getElementById("mensaje").value;
  const fecha = new Date().toLocaleDateString("es-ES");
  ///Agregar la validación de los campos nombre y mensaje

  let datosGuardados = JSON.parse(localStorage.getItem("datos")) || [];
  datosGuardados.push({ fecha, nombre, mensaje });

  localStorage.setItem("datos", JSON.stringify(datosGuardados));

  document.getElementById("nombre").value = "";
  document.getElementById("mensaje").value = "";
  mostrarDatos();
}

function mostrarDatos() {
  const datosGuardados = JSON.parse(localStorage.getItem("datos")) || [];
  const datosDiv = document.getElementById("datosGuardados");
  datosDiv.innerHTML = "";

  if (datosGuardados.length > 0) {
    datosGuardados.forEach((dato, index) => {
      const p = document.createElement("p");
      p.innerHTML =
        "<div id= " +
        index +
        "> El día " +
        dato.fecha +
        "<strong> " +
        dato.nombre +
        "</strong> dijo: <strong>" +
        dato.mensaje +
        " <strong> <button onclick= editar(" +
        index +
        ")>editar</button> <button onclick= borrar(" +
        index +
        ")>borrar</button></div>";
      datosDiv.appendChild(p);
    });
  } else {
    const p2 = document.createElement("p");
    p2.innerHTML = "<p>No hay mensajes 😞 </p>";
    console.log("No hay mensajes 😞");
  }
}

function borrar(item) {
  //Toma los datos guardados en localStorage
  let datosGuardados = JSON.parse(localStorage.getItem("datos")) || [];
  //Del array saca el registro que queremos borrar
  console.log(datosGuardados[item]);
  datosGuardados.splice(item, 1);
  //Volvemos a guardar en localStorage
  localStorage.setItem("datos", JSON.stringify(datosGuardados));
  //recargamos el listado
  mostrarDatos();
}

function editar(item) {
  //Toma el dato que quiere cambiar el  usuario.
  let mensaje = window.prompt("Cambiar el mensaje");
  //tomamos los datos del localStorage
  const datosGuardados = JSON.parse(localStorage.getItem("datos"));
  //modificamos el registro que se seleccinó.
  let menAnterior = datosGuardados[item];
  console.log(menAnterior.fecha);
  console.log(mensaje);
  let fecha = menAnterior.fecha;
  let nombre = menAnterior.nombre;
  //se borra el dato que se modificó.
  datosGuardados.splice(item, 1);
  //se agrega un registro modificado.
  datosGuardados.push({ fecha, nombre, mensaje });
  console.log(datosGuardados);
  //Se guarda el archivo modificado en el localStorage.
  localStorage.setItem("datos", JSON.stringify(datosGuardados));
  //se recarga el listado
  mostrarDatos();
}
