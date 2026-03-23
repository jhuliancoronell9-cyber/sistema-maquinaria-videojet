// ===================== BASE DE DATOS DE MÁQUINAS =====================
const maquinasDB = [
  { id: 0, nombre: "Videojet CIJ 1880", tipo: "CIJ", tecnologia: "Inyección continua (CIJ)", materiales: "Plástico, Vidrio, Metal pintado", codigo: "1880-CIJ-VID", imagen: "./imagenes/cij-1880.png", descripcion: "Sistema de codificación CIJ de alta velocidad, ideal para líneas de producción." },
  { id: 1, nombre: "Videojet Laser 3350", tipo: "Láser", tecnologia: "Marcado láser", materiales: "Plástico, Metal, Cartón", codigo: "3350-LAS-VID", imagen: "./imagenes/laser-3350.png", descripcion: "Marcadora láser robusta para trazabilidad y codificación permanente." },
  { id: 2, nombre: "Videojet Wolke M610", tipo: "TIJ", tecnologia: "Tinta térmica (TIJ)", materiales: "Papel, Cartón, Etiquetas", codigo: "M610-TIJ-VID", imagen: "./imagenes/wolke-m610.png", descripcion: "Impresora térmica Wolke M610 para códigos de alta resolución en empaques." }
];

// ===================== FUNCIONES =====================

// Crear tarjeta
function crearCard(m, isLocal = false, index = null) {
  const col = document.createElement("div");
  col.className = "col-md-4 mb-4";

  const cardClass = isLocal ? "card shadow-sm h-100 border border-success" : "card shadow-sm h-100";

  col.innerHTML = `
    <div class="${cardClass}">
      <img src="${m.imagen}" class="card-img-top" alt="${m.nombre}">
      <div class="card-body">
        <h5 class="card-title">${m.nombre}</h5>
        <p class="card-text"><strong>Código:</strong> ${m.codigo}</p>
      </div>
    </div>
  `;

  const body = col.querySelector(".card-body");

  if (isLocal) {
    // Contenedor de botones en fila
    const btnContainer = document.createElement("div");
    btnContainer.className = "d-flex justify-content-between mt-3";

    // Botón Ver Detalles
    const btnDetalle = document.createElement("button");
    btnDetalle.className = "btn btn-primary btn-sm flex-grow-1 me-2";
    btnDetalle.textContent = "Ver detalles";
    btnDetalle.addEventListener("click", () => verDetalle(m.id));

    // Botón Eliminar con confirmación
    const btnEliminar = document.createElement("button");
    btnEliminar.className = "btn btn-danger btn-sm flex-grow-1";
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", () => {
      if (confirm(`¿Estás seguro que deseas eliminar "${m.nombre}"?`)) {
        eliminarMaquina(index);
      }
    });

    btnContainer.appendChild(btnDetalle);
    btnContainer.appendChild(btnEliminar);
    body.appendChild(btnContainer);

  } else {
    // Para máquinas de la DB: botón grande
    const btnDetalle = document.createElement("button");
    btnDetalle.className = "btn btn-primary w-100 mt-2";
    btnDetalle.textContent = "Ver detalles";
    btnDetalle.addEventListener("click", () => verDetalle(m.id));
    body.appendChild(btnDetalle);
  }

  return col;
}

// Crear item lateral para registro
function crearRegistroItem(m, index) {
  const div = document.createElement("div");
  div.className = "registro-item d-flex align-items-center mb-2";
  div.onclick = () => verDetalle(100 + index);

  div.innerHTML = `
    <img src="${m.imagen}" class="registro-img rounded-circle me-2" alt="${m.nombre}">
    <div>
      <div>${m.nombre}</div>
      <div class="text-muted" style="font-size: 12px;">${m.codigo}</div>
    </div>
  `;
  return div;
}

// Eliminar máquina local
function eliminarMaquina(index) {
  let lista = JSON.parse(localStorage.getItem("maquinas")) || [];
  lista.splice(index, 1);
  localStorage.setItem("maquinas", JSON.stringify(lista));
  renderCatalogo();
  renderListaRegistradas();
}

// Renderizar catálogo
function renderCatalogo() {
  const cont = document.getElementById("catalogoLista");
  if (!cont) return;
  cont.innerHTML = "";

  // Catálogo base
  const tituloBase = document.createElement("h3");
  tituloBase.textContent = "Catálogo";
  cont.appendChild(tituloBase);

  maquinasDB.forEach(m => cont.appendChild(crearCard(m)));

  // Máquinas registradas
  const lista = JSON.parse(localStorage.getItem("maquinas")) || [];
  if (lista.length > 0) {
    const tituloLocal = document.createElement("h3");
    tituloLocal.textContent = "Máquinas Registradas";
    tituloLocal.className = "mt-4 text-success";
    cont.appendChild(tituloLocal);

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

// Renderizar lista lateral en registro.html
function renderListaRegistradas() {
  const cont = document.getElementById("listaRegistradas");
  if (!cont) return;

  cont.innerHTML = "";
  const lista = JSON.parse(localStorage.getItem("maquinas")) || [];
  lista.forEach((m, index) => {
    const maquinaLocal = {
      id: 100 + index,
      nombre: m.nombre,
      codigo: m.serie,
      imagen: "./imagenes/registro.png"
    };
    cont.appendChild(crearRegistroItem(maquinaLocal, index));
  });
}

// Ver detalle
function verDetalle(id) {
  window.location.href = `detalle.html?id=${id}`;
}

// Cargar detalle
function cargarDetalle() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  let m = maquinasDB.find(x => x.id === id);

  if (!m && id >= 100) {
    const lista = JSON.parse(localStorage.getItem("maquinas")) || [];
    const localIndex = id - 100;
    if (lista[localIndex]) {
      m = {
        id,
        nombre: lista[localIndex].nombre,
        codigo: lista[localIndex].serie,
        imagen: "./imagenes/registro.png",
        tecnologia: lista[localIndex].tipo || "",
        materiales: "N/A",
        descripcion: "Registrada por el usuario"
      };
    }
  }

  if (!m) return;

  const imgDetalle = document.getElementById("detalle-imagen");
  if (imgDetalle) {
    imgDetalle.src = m.imagen;
    imgDetalle.onclick = () => abrirImagen(m.imagen);
  }

  const nombres = ["detalle-nombre","detalle-tecnologia","detalle-materiales","detalle-codigo","detalle-descripcion"];
  const valores = [m.nombre, m.tecnologia, m.materiales, m.codigo, m.descripcion];
  nombres.forEach((id, i) => {
    const el = document.getElementById(id);
    if(el) el.textContent = valores[i];
  });
}

// Visor de imagen
function abrirImagen(src) {
  const visor = document.getElementById("visorImagen");
  const img = document.getElementById("imagenGrande");
  if (!visor || !img) return;
  img.src = src;
  visor.style.display = "flex";
}
function cerrarImagen() {
  const visor = document.getElementById("visorImagen");
  if (visor) visor.style.display = "none";
}

// ===================== BÚSQUEDAS CORREGIDAS =====================

// Buscar por serie
function buscarPorSerie() {
  const serieInput = document.getElementById("inputSerie").value.toLowerCase();
  const cont = document.getElementById("resultadoSerie");
  cont.innerHTML = "";

  const listaLocal = JSON.parse(localStorage.getItem("maquinas")) || [];

  const resultados = [
    ...maquinasDB.filter(m => m.codigo.toLowerCase().includes(serieInput)),
    ...listaLocal
      .map((m, i) => ({
        id: 100 + i,
        nombre: m.nombre,
        codigo: m.serie,
        imagen: "./imagenes/registro.png",
        tecnologia: m.tipo || "",
        materiales: "N/A",
        descripcion: "Registrada por el usuario"
      }))
      .filter(m => m.codigo.toLowerCase().includes(serieInput))
  ];

  if (resultados.length === 0) {
    cont.innerHTML = "<p>No se encontraron resultados.</p>";
    return;
  }

  const row = document.createElement("div");
  row.className = "row";
  resultados.forEach(m => row.appendChild(crearCard(m, m.id >= 100, m.id >= 100 ? m.id - 100 : null)));
  cont.appendChild(row);
}

// Búsqueda avanzada
function buscarAvanzado() {
  const tipo = (document.getElementById("tipo").value || "").toLowerCase();
  const tecnologia = (document.getElementById("tecnologia").value || "").toLowerCase();
  const material = (document.getElementById("material").value || "").toLowerCase();
  const cont = document.getElementById("resultadosAvanzados");
  cont.innerHTML = "";

  const listaLocal = JSON.parse(localStorage.getItem("maquinas")) || [];

  const resultados = [
    ...maquinasDB.filter(m =>
      (!tipo || m.tipo.toLowerCase().includes(tipo)) &&
      (!tecnologia || m.tecnologia.toLowerCase().includes(tecnologia)) &&
      (!material || m.materiales.toLowerCase().includes(material))
    ),
    ...listaLocal
      .map((m, i) => ({
        id: 100 + i,
        nombre: m.nombre,
        codigo: m.serie,
        imagen: "./imagenes/registro.png",
        tecnologia: m.tipo || "",
        materiales: "N/A",
        descripcion: "Registrada por el usuario"
      }))
      .filter(m =>
        (!tipo || (m.tecnologia || "").toLowerCase().includes(tipo) || (m.tecnologia || "").toLowerCase().includes(tecnologia)) &&
        (!tecnologia || (m.tecnologia || "").toLowerCase().includes(tecnologia)) &&
        (!material || (m.material || "").toLowerCase().includes(material))
      )
  ];

  if (resultados.length === 0) {
    cont.innerHTML = "<p>No hay coincidencias.</p>";
    return;
  }

  const row = document.createElement("div");
  row.className = "row";
  resultados.forEach(m => row.appendChild(crearCard(m, m.id >= 100, m.id >= 100 ? m.id - 100 : null)));
  cont.appendChild(row);
}

// ===================== INICIALIZAR =====================
document.addEventListener("DOMContentLoaded", () => {
  renderCatalogo();
  renderListaRegistradas();
  cargarDetalle();
});
