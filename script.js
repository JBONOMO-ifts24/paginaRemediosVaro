document.addEventListener("DOMContentLoaded", (event) => {
  mostrarDatos();
  console.log("Hola 🌎 !!!");
});

function guardarDatos() {
  let nombre = document.getElementById("nombre").value;
  let mensaje = document.getElementById("mensaje").value;
  const fecha = new Date().toLocaleDateString("es-ES");
  const avi = document.getElementById("avisos");

  nombre = nombre.trim(); //Se sacan los espacios en blanco adelante y atrás del string
  mensaje = mensaje.trim();

  //Validación de los datos en los campos nombre y mensaje
  if (nombre.length < 3 || mensaje.length < 3) {
    const p = document.createElement("div");
    let mensaje =
      '<div class="alert alert-danger" role="alert">Los datos ingresados no son correctos</div>';

    p.innerHTML = mensaje;
    avi.appendChild(p);
    document.getElementById("nombre").value = "";
    document.getElementById("mensaje").value = "";

    setTimeout(() => {
      avi.innerHTML = "";
    }, 4000);
  } else {
    let datosGuardados = JSON.parse(localStorage.getItem("datos")) || [];
    datosGuardados.push({ fecha, nombre, mensaje });

    localStorage.setItem("datos", JSON.stringify(datosGuardados));

    document.getElementById("nombre").value = "";
    document.getElementById("mensaje").value = "";
    avi.innerHTML = "";
    mostrarDatos();
  }
}

function mostrarDatos() {
  const datosGuardados = JSON.parse(localStorage.getItem("datos")) || [];
  const datosDiv = document.getElementById("datosGuardados");
  datosDiv.innerHTML = "";

  if (datosGuardados.length > 0) {
    datosGuardados.forEach((dato, index) => {
      const p = document.createElement("div");
      p.innerHTML =
        "<p>El día " +
        dato.fecha +
        "<strong> " +
        dato.nombre +
        "</strong> escribió: <strong>" +
        dato.mensaje +
        " </strong> <button class='btn btn-primary' onclick= editar(" +
        index +
        ")>✏️</button> <button class='btn btn-primary' onclick= borrar(" +
        index +
        ")>❌</button></p>";
      datosDiv.appendChild(p);
    });
  } else {
    const p = document.createElement("div");
    p.innerHTML = "<p>No hay mensajes 😞 </p>";
    console.log("No hay mensajes 😞");
    datosDiv.appendChild(p);
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
  //Se avisa que se guardó corractamente la info
  const avi = document.getElementById("avisos");
  const p = document.createElement("div");
  let mensaje =
    '<div class="alert alert-success" role="alert">Mensaje Borrado 💀</div>';

  p.innerHTML = mensaje;
  avi.appendChild(p);

  setTimeout(() => {
    avi.innerHTML = "";
  }, 4000);
}

function editar(item) {
  //Toma el dato que quiere cambiar el  usuario.
  let mensaje = window.prompt("Cambiar el mensaje");
  mensaje = mensaje + " [editado] ";
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
