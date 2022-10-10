let cards = document.querySelectorAll(".card");
let btnDel = document.querySelectorAll(".delete");
let btnEdit = document.querySelectorAll(".edit");
const columns = document.querySelectorAll(".column");
const plusButton = document.getElementById("add-card");
const editContainer = document.querySelector(".edit-container");
const btnClose = document.querySelector(".btn-close");
const btnConfirmEdit = document.querySelector(".btn-confirm-edit");
const elementText = document.getElementById("textCard");
const mainContainer = document.querySelector(".container");

/* Eventos dos Cards e Columns*/
selectAllCards();
selectAllBtnDel();
selectAllBtnEdit();

function dragStart(e) {
  this.classList.add("is-dragging");
}
function dragEnd() {
  this.classList.remove("is-dragging");
}

columns.forEach((column) => {
  column.addEventListener("dragover", dragOver);
  column.addEventListener("dragleave", dragLeave);
});

function dragOver() {
  this.classList.add("highlight");

  const cardDragged = document.querySelector(".is-dragging");
  this.appendChild(cardDragged);
}
function dragLeave() {
  this.classList.remove("highlight");
}

/* -------------Btn criar Card-------------- */

/* Botão de criar Card */
plusButton.addEventListener("click", () => {
  createCardInnerHTML();
});

/* Função criar novo Card */
function createCardInnerHTML() {
  const column = document.querySelector(".column");
  const divCard = document.createElement("div");
  divCard.className = "card";
  divCard.draggable = "true";
  divCard.innerHTML = `<div class="description"></div>
  <hr />
  <div class="div-buttons">
    <button class="edit">
      <i class="fa-solid fa-pen-to-square" title="Editar"></i>
    </button>
    <button class="delete">
      <i class="fa-regular fa-trash-can" title="Excluir"></i>
    </button>
  </div>`;
  column.appendChild(divCard);
  selectAllCards();
  selectAllBtnDel();
  selectAllBtnEdit();
}

/* Atualizar seleção de cards*/
function selectAllCards() {
  cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("dragstart", dragStart);
    card.addEventListener("dragend", dragEnd);
  });
}

/* -----------Btn Delete-------------- */

/* Função selecionar todos deletes */
function selectAllBtnDel() {
  btnDel = document.querySelectorAll(".delete");
  btnDel.forEach((del) => {
    del.addEventListener("click", deleteCard);
  });
}
/* Função delete card */
function deleteCard() {
  const option = confirm("Deseja excluir esse Card?");
  if (option) {
    const cardDelete = this.parentNode.parentNode;
    cardDelete.remove();
  }
  return;
}

/* -----------------Btn Edit--------------- */

/* Selecionar todos os botões edit */
function selectAllBtnEdit() {
  btnEdit = document.querySelectorAll(".edit");
  btnEdit.forEach((editBtn) => {
    editBtn.addEventListener("click", edit);
  });
}
/* Função abrir janela edit */
function edit() {
  mainContainer.style.pointerEvents = "none";
  const cardEdit = this.parentNode.parentNode;
  editContainer.style.display = "block";
  cardEdit.classList.add("is-edit");
}

/*--------------- Janela Edit-------------- */

/* Evento botão fechar */
btnClose.addEventListener("click", closing);

/* Função fechar janela */
function closing() {
  const cardEditing = document.querySelector(".is-edit");
  editContainer.style.display = "none";
  mainContainer.style.pointerEvents = "all";
  elementText.value = "";
  cardEditing.classList.remove("is-edit");
}

/* Evento Botão adicionar texto com Click e Enter */
btnConfirmEdit.addEventListener("click", addText);
elementText.addEventListener("keydown", addTextEnter);

/* Função adicionar texto no card */
function addText(e) {
  const desc = document.querySelector(".is-edit");
  desc.children[0].innerHTML = elementText.value;
  closing();
}

/* Função adicionar texto no card com o Enter */
function addTextEnter(e) {
  if (e.keyCode === 13) {
    const desc = document.querySelector(".is-edit");
    desc.children[0].innerHTML = elementText.value;
    closing();
  }
}
