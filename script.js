const input = document.querySelector("#nova-tarefa");
const btn = document.querySelector("#btn-add");
const lista = document.querySelector("#lista");
const btnClear = document.querySelector("#btn-clear");

// Carregar tarefas salvas ao abrir a página
window.onload = () => {
  const tarefasSalvas = JSON.parse(localStorage.getItem("tarefas")) || [];
  tarefasSalvas.forEach(adicionarTarefa);
};

btn.addEventListener("click", () => {
  const texto = input.value.trim();
  if (texto !== "") {
    adicionarTarefa(texto);
    salvarTarefa(texto);
    input.value = "";
    input.focus();
  }
});

btnClear.addEventListener("click", () => {
  localStorage.removeItem("tarefas");
  lista.innerHTML = "";
});

function adicionarTarefa(texto) {
  const li = document.createElement("li");
  li.textContent = texto;
  li.addEventListener("click", () => {
    li.classList.toggle("concluida");
  });

  const btnDel = document.createElement("button");
  btnDel.textContent = "🗑️";
  btnDel.onclick = (e) => {
    e.stopPropagation(); // Impede o toggle de concluída ao clicar no botão
    lista.removeChild(li);
    removerTarefa(texto);
  };

  li.appendChild(btnDel);
  lista.appendChild(li);
}

function salvarTarefa(texto) {
  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  tarefas.push(texto);
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function removerTarefa(texto) {
  let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  tarefas = tarefas.filter(t => t !== texto);
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}