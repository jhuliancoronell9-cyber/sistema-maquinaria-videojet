
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

// ----- CREAR TARJETA -----
function crearCard(m, isLocal = false, index = null) {
  const col = document.createElement("div");
  col.className = "col-md-4 mb-4";

  // Diferenciar tarjetas locales con un borde o fondo
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

// ----- ELIMINAR MÁQUINA LOCAL -----
function eliminarMaquina(index) {
  let lista = JSON.parse(localStorage.getItem("maquinas")) || [];
  lista.splice(index, 1);
  localStorage.setItem("maquinas", JSON.stringify(lista));
  renderCatalogo();
}

// ----- RENDERIZAR CATÁLOGO -----
function renderCatalogo() {
  const cont = document.getElementById("catalogoLista");
  if (!cont) return;
  cont.innerHTML = "";

  // Título catálogo base
  const tituloBase = document.createElement("h3");
  tituloBase.textContent = "Catálogo";
  cont.appendChild(tituloBase);
  maquinasDB.forEach(m => cont.appendChild(crearCard(m)));

  // Máquinas registradas
  let lista = JSON.parse(localStorage.getItem("maquinas")) || [];
  if (lista.length > 0) {
    const tituloLocal = document.createElement("h3");
    tituloLocal.textContent = "Máquinas Registradas";
    tituloLocal.className = "mt-5 text-success"; // verde para diferenciar
    cont.appendChild(tituloLocal);

    lista.forEach((m, index) => {
      const maquinaLocal = {
        id: 100 + index,
        nombre: m.nombre,
        codigo: m.serie,
        imagen: "imagenes/registro.png"
      };
      cont.appendChild(crearCard(maquinaLocal, true, index));
    });
  }
}

// ----- VER DETALLE -----
function verDetalle(id) {
  window.location.href = `detalle.html?id=${id}`;
}

// ----- CARGAR DETALLE -----
function cargarDetalle() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const m = maquinasDB.find(x => x.id === id);

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

// ----- VISOR DE IMAGEN -----
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

// ----- EVENTO DOMContentLoaded -----
document.addEventListener("DOMContentLoaded", () => {
  renderCatalogo();
  cargarDetalle();
});

function cerrarImagen() {
  document.getElementById("visorImagen").style.display = "none";
}

