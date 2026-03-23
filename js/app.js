
const maquinasDB = [
  {
    id: 0,
    nombre: "Videojet CIJ 1880",
    tipo: "CIJ",
    tecnologia: "Inyección continua (CIJ)",
    materiales: "Plástico, Vidrio, Metal pintado",
    codigo: "1880-CIJ-VID",
    imagen: "./imagenes/cij-1880.png",
    descripcion: "Sistema de codificación CIJ de alta velocidad, ideal para líneas de producción."
  },
  {
    id: 1,
    nombre: "Videojet Laser 3350",
    tipo: "Láser",
    tecnologia: "Marcado láser",
    materiales: "Plástico, Metal, Cartón",
    codigo: "3350-LAS-VID",
    imagen: "./imagenes/laser-3350.png",
    descripcion: "Marcadora láser robusta para trazabilidad y codificación permanente."
  },
  {
    id: 2,
    nombre: "Videojet Wolke M610",
    tipo: "TIJ",
    tecnologia: "Tinta térmica (TIJ)",
    materiales: "Papel, Cartón, Etiquetas",
    codigo: "M610-TIJ-VID",
    imagen: "./imagenes/wolke-m610.png",
    descripcion: "Impresora térmica Wolke M610 para códigos de alta resolución en empaques."
  }
];

function crearCard(m, isLocal = false, index = null) {
  const col = document.createElement("div");
  col.className = "col-md-4 mb-4";

  let botonEliminar = "";
  if (isLocal) {
    botonEliminar = `<button class="btn btn-danger w-100 mt-2" onclick="eliminarMaquina(${index})">
                        Eliminar
                     </button>`;
  }

  col.innerHTML = `
    <div class="card shadow-sm h-100">
      <img src="${m.imagen}" class="card-img-top" alt="${m.nombre}">
      <div class="card-body">
        <h5 class="card-title">${m.nombre}</h5>
        <p class="card-text"><strong>Código:</strong> ${m.codigo}</p>
        <button class="btn btn-primary w-100" onclick="verDetalle(${m.id})">
          Ver detalles
        </button>
        ${botonEliminar}
      </div>
    </div>
  `;
  return col;
}

function eliminarMaquina(index) {
  let lista = JSON.parse(localStorage.getItem("maquinas")) || [];
  lista.splice(index, 1); // elimina la máquina del array
  localStorage.setItem("maquinas", JSON.stringify(lista));
  renderCatalogo(); // vuelve a renderizar el catálogo
}

function renderCatalogo() {
  const cont = document.getElementById("catalogoLista");
  if (!cont) return;

  cont.innerHTML = "<h3>Catálogo</h3>";
  // Máquinas base
  maquinasDB.forEach(m => cont.appendChild(crearCard(m)));

  // Máquinas registradas por el usuario
  let lista = JSON.parse(localStorage.getItem("maquinas")) || [];
  if (lista.length > 0) {
    const titulo = document.createElement("h3");
    titulo.textContent = "Máquinas Registradas";
    titulo.className = "mt-4";
    cont.appendChild(titulo);

    lista.forEach((m, index) => {
      const maquinaLocal = {
        id: 100 + index,
        nombre: m.nombre,
        codigo: m.serie,
        imagen: "./imagenes/registro.png"
      };
      cont.appendChild(crearCard(maquinaLocal, true, index));
    });
  }
}

function verDetalle(id) {
  window.location.href = `detalle.html?id=${id}`;
}

function cargarDetalle() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  const m = maquinasDB.find(x => x.id === id);

  if (!m) {
    document.querySelector(".container").innerHTML +=
      "<p>No se encontró información de la máquina.</p>";
    return;
  }

  const imgDetalle = document.getElementById("detalle-imagen");
imgDetalle.src = m.imagen;
imgDetalle.onclick = () => abrirImagen(m.imagen);
  // document.getElementById("detalle-imagen").src = m.imagen;
  document.getElementById("detalle-nombre").textContent = m.nombre;
  document.getElementById("detalle-tecnologia").textContent = m.tecnologia;
  document.getElementById("detalle-materiales").textContent = m.materiales;
  document.getElementById("detalle-codigo").textContent = m.codigo;
  document.getElementById("detalle-descripcion").textContent = m.descripcion;
}

function buscarPorSerie() {
  const serie = document.getElementById("inputSerie").value.toLowerCase();
  const cont = document.getElementById("resultadoSerie");
  cont.innerHTML = "";

  const resultados = maquinasDB.filter(m =>
    m.codigo.toLowerCase().includes(serie)
  );

  if (resultados.length === 0) {
    cont.innerHTML = "<p>No se encontraron resultados.</p>";
    return;
  }

  const row = document.createElement("div");
  row.className = "row";

  resultados.forEach(m => row.appendChild(crearCard(m)));
  cont.appendChild(row);
}

function buscarAvanzado() {
  const tipo = document.getElementById("tipo").value.toLowerCase();
  const tecnologia = document.getElementById("tecnologia").value.toLowerCase();
  const material = document.getElementById("material").value.toLowerCase();

  const cont = document.getElementById("resultadosAvanzados");
  cont.innerHTML = "";

  const resultados = maquinasDB.filter(m =>
    (!tipo || m.tipo.toLowerCase() === tipo) &&
    (!tecnologia || m.tecnologia.toLowerCase().includes(tecnologia)) &&
    (!material || m.materiales.toLowerCase().includes(material))
  );

  if (resultados.length === 0) {
    cont.innerHTML = "<p>No hay coincidencias.</p>";
    return;
  }

  const row = document.createElement("div");
  row.className = "row";

  resultados.forEach(m => row.appendChild(crearCard(m)));
  cont.appendChild(row);
}

document.addEventListener("DOMContentLoaded", () => {
  renderCatalogo();
  cargarDetalle();
});

function abrirImagen(src) {
  const visor = document.getElementById("visorImagen");
  const img = document.getElementById("imagenGrande");

  img.src = src;
  visor.style.display = "flex";
}

function cerrarImagen() {
  document.getElementById("visorImagen").style.display = "none";
}

