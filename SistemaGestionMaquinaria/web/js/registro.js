document.getElementById("formMaquina").addEventListener("submit", function(e) {
e.preventDefault();

let maquina = {
id: document.getElementById("id").value,
nombre: document.getElementById("nombre").value,
serie: document.getElementById("serie").value,
tipo: document.getElementById("tipo").value,
estado: document.getElementById("estado").value
};

let lista = JSON.parse(localStorage.getItem("maquinas")) || [];

lista.push(maquina);

localStorage.setItem("maquinas", JSON.stringify(lista));

alert("Máquina registrada");

window.location.href = "catalogo.html";
});