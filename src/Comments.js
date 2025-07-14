import "./Style.css";

// Надо добавить фильтрацию

let btn = document.querySelector(".btn.btn--add");
let recordsList = document.querySelector(".notes__list");
const input = document.querySelector(".notes__input");
let note = document.getElementsByClassName("notes__item");

// Проверка на наличие ключа
function checkData() {
  const checking = localStorage.getItem("data");
  if (!checking) {
    localStorage.setItem("data", JSON.stringify([{ title: "Первая заметка" }]));
  }
}

checkData();

const parsing = JSON.parse(localStorage.data);

// Рендер (обновление) заметок
function renderNotes() {
  recordsList.innerHTML = "";
  localStorage.setItem("data", JSON.stringify(parsing));
  for (let i = 0; i < parsing.length; i++) {
    recordsList.insertAdjacentHTML("beforeend", getNote(parsing[i], i));
  }
  if (parsing.length === 0) {
    recordsList.innerHTML = `<p style="font-size: 1.5rem;">Заметки отсутствуют ...<p>`;
  }
}

renderNotes();

//Обработчик добавления новой заметки
btn.onclick = function () {
  const notes = {
    title: input.value,
  };

  if (input.value.length >= 5 && input.value.length <= 50) {
    recordsList.innerHTML = "";
    parsing.push(notes);
    renderNotes();
  } else {
    input.focus();
    viewAlert();
  }

  input.value = "";
};

recordsList.onclick = function (event) {
  const { type, id } = event.target.dataset;
  if (type === "remove") {
    recordsList.innerHTML = "";
    parsing.splice(id, 1);
    renderNotes();
  } else if (type === "update") {
    recordsList.innerHTML = ""; // Предотвращение открытия 2 окон одновременно
    renderNotes();
    note[id].innerHTML = "";
    note[id].insertAdjacentHTML("beforeend", getUpdateNotes(parsing[id], id));
  } else if (type === "save") {
    const editInput = document.querySelector(".notes__input.notes__input--edit");
    
    if (editInput && editInput.value) {
      if (editInput.value.length >= 3 && editInput.value.length <= 50) {
        parsing[id].title = editInput.value;
        recordsList.innerHTML = "";
        renderNotes();
      } else {
        editInput.focus();
        viewAlert();
      }
    }
  } else if (type == "cancel") {
    recordsList.innerHTML = "";
    renderNotes();
  }
};

function getNote(value, id) {
  return `
    <li class="notes__item" data-id=${id}>
      <p class="notes__text">${value.title}</p>
      <menu class="btn__toolbar">
        <button class="btn btn--update" data-id=${id} data-type="update">Редактировать</button>
        <button class="btn btn--delete" data-id=${id} data-type="remove">Удалить</button>
      </menu>
    </li>
  `;
}

function getUpdateNotes(value, id) {
  return `
    <input type="text" class="notes__input notes__input--edit" value="${value.title}"></input>
    <menu class='btn__toolbar'>
      <button class="btn btn--save" data-id=${id} data-type="save">Сохранить</button>
      <button class="btn btn--cancel" data-id=${id} data-type="cancel">Отмена</button>
    </menu>
  `;
}

function viewAlert() {
  const alertBlock = document.createElement("div");
  alertBlock.className = "alert";

  const text = document.createElement("span");
  text.style.cssText = "";
  text.textContent = "Ошибка, недопустимый размер строки";

  alertBlock.appendChild(text);
  document.body.append(alertBlock);

  setTimeout(() => alertBlock.remove(), 3500);
}
