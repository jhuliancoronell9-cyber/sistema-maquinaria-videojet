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
        <button class="btn btn-primary w-100 ver-detalle">Ver detalles</button>
      </div>
    </div>
  `;

  col.querySelector(".ver-detalle").addEventListener("click", () => verDetalle(m.id));

  if (isLocal) {
    const btn = document.createElement("button");
    btn.className = "btn btn-danger w-100 mt-2";
    btn.textContent = "Eliminar";
    btn.addEventListener("click", () => eliminarMaquina(index));
    col.querySelector(".card-body").appendChild(btn);
  }

  return col;
}

// Buscar por serie incluyendo máquinas locales
function buscarPorSerie() {
  const serieInput = document.getElementById("inputSerie").value.toLowerCase();
  const cont = document.getElementById("resultadoSerie");
  cont.innerHTML = "";

  // Buscar en base de datos
  let resultados = maquinasDB.filter(m => m.codigo.toLowerCase().includes(serieInput));

  // Buscar en localStorage
  const listaLocal = JSON.parse(localStorage.getItem("maquinas")) || [];
  listaLocal.forEach((m, index) => {
    if ((m.serie || "").toLowerCase().includes(serieInput)) {
      resultados.push({
        id: 100 + index,
        nombre: m.nombre,
        codigo: m.serie,
        imagen: "./imagenes/registro.png",
        tecnologia: m.tipo || "",
        materiales: "N/A",
        descripcion: "Registrada por el usuario"
      });
    }
  });

  if (resultados.length === 0) {
    cont.innerHTML = "<p>No se encontraron resultados.</p>";
    return;
  }

  const row = document.createElement("div");
  row.className = "row";
  resultados.forEach(m => row.appendChild(crearCard(m, m.id >= 100, m.id >= 100 ? m.id - 100 : null)));
  cont.appendChild(row);
}

// Búsqueda avanzada incluyendo máquinas locales
function buscarAvanzado() {
  const tipo = (document.getElementById("tipo").value || "").toLowerCase();
  const tecnologia = (document.getElementById("tecnologia").value || "").toLowerCase();
  const material = (document.getElementById("material").value || "").toLowerCase();
  const cont = document.getElementById("resultadosAvanzados");
  cont.innerHTML = "";

  let resultados = [];

  // Base de datos
  maquinasDB.forEach(m => {
    if (
      (!tipo || m.tipo.toLowerCase().includes(tipo)) &&
      (!tecnologia || m.tecnologia.toLowerCase().includes(tecnologia)) &&
      (!material || m.materiales.toLowerCase().includes(material))
    ) resultados.push(m);
  });

  // LocalStorage
  const listaLocal = JSON.parse(localStorage.getItem("maquinas")) || [];
  listaLocal.forEach((m, index) => {
    if (
      (!tipo || (m.tipo || "").toLowerCase().includes(tipo)) &&
      (!tecnologia || (m.tecnologia || "").toLowerCase().includes(tecnologia)) &&
      (!material || (m.material || "").toLowerCase().includes(material))
    ) {
      resultados.push({
        id: 100 + index,
        nombre: m.nombre,
        codigo: m.serie,
        imagen: "./imagenes/registro.png",
        tecnologia: m.tipo || "",
        materiales: "N/A",
        descripcion: "Registrada por el usuario"
      });
    }
  });

  if (resultados.length === 0) {
    cont.innerHTML = "<p>No hay coincidencias.</p>";
    return;
  }

  const row = document.createElement("div");
  row.className = "row";
  resultados.forEach(m => row.appendChild(crearCard(m, m.id >= 100, m.id >= 100 ? m.id - 100 : null)));
  cont.appendChild(row);
}
