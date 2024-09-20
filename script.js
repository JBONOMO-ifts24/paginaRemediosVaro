document.addEventListener("DOMContentLoaded", (event) => {
  mostrarDatos();
  console.log("Hola 🌎 !!!");
});

function guardarDatos() {
  const nombre = document.getElementById("nombre").value;
  const mensaje = document.getElementById("mensaje").value;

  let datosGuardados = JSON.parse(localStorage.getItem("datos")) || [];
  datosGuardados.push({ nombre, mensaje });

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
        "<p> <strong> " +
        dato.nombre +
        "</strong> dijo: <strong>" +
        dato.mensaje +
        " <strong></p>";
      datosDiv.appendChild(p);
    });
  } else {
    const p2 = document.createElement("p");
    p2.innerText = "No hay mensajes  😞";
  }
}
