import "./Style.css";

// Добавить фильтрацию

let btn = document.querySelector(".btn.btn--add");
let recordsList = document.querySelector(".notes__list");
const input = document.querySelector(".notes__input");
let currentRecords = document.getElementsByClassName("notes__item");

// "Проверяем, есть ли заметки и само хранилище. Если нет — инициализируем новое"
function initData() {
  const isInit = localStorage.getItem("data");
  if (!isInit) {
    localStorage.setItem("data", JSON.stringify([{ text: "Первая заметка" }]));
  }
}

// Получение данных из localStorage
function getData() {
  return JSON.parse(localStorage.getItem("data") || []);
}

// Сохранение данных в localStorage
function saveData(data) {
  localStorage.setItem("data", JSON.stringify(data));
}

// Инициализация заметки в формате HTML
const getRecord = (note, id) => {
  return `
    <li class="notes__item" data-id=${id}>
      <p class="notes__text">${note.text}</p>
      <menu class="btn__toolbar">
        <button class="btn btn--update" data-id=${id} data-type="update">Редактировать</button>
        <button class="btn btn--delete" data-id=${id} data-type="remove">Удалить</button>
      </menu>
    </li>
  `;
};

// Инициализация блока редактирования заметки в формате HTML
const getEditRecord = (note, id) => {
  return `
    <input type="text" class="notes__input notes__input--edit" value="${note.text}"></input>
    <menu class='btn__toolbar'>
      <button class="btn btn--save" data-id=${id} data-type="save">Сохранить</button>
      <button class="btn btn--cancel" data-id=${id} data-type="cancel">Отмена</button>
    </menu>
  `;
};

// Формирование и рендер списка заметок на основе полученных данных
const updateNotes = () => {
  recordsList.innerHTML = "";
  const data = getData();
  if (data.length === 0) {
    recordsList.innerHTML = `<p style="font-size: 1.5rem;">Заметки на текущий момент отсутствуют ...<p>`;
  }
  data.map((record, ind) => {
    recordsList.insertAdjacentHTML("beforeend", getRecord(record, ind));
  });
};

// Создание всплывающего алерта при возникновении ошибок
const showErrorAlert = (message = "Ошибка: недопустимый размер записи") => {
  const alertBlock = document.createElement("div");
  alertBlock.className = "alert";

  const text = document.createElement("span");
  text.textContent = message;

  alertBlock.appendChild(text);
  document.body.append(alertBlock);

  setTimeout(() => alertBlock.remove(), 3500);
};

// Добавление новой заметки
function addNote() {
  const data = getData();

  // Данные в необходимом формате, которые будут добавляться
  const formData = {
    text: input.value.trim(),
  };

  if (input.value.length >= 5 && input.value.length <= 50) {
    data.push(formData);
    saveData(data);
    updateNotes();
  } else {
    input.focus();
    showErrorAlert();
  }
  input.value = "";
}

// Удаление заметки
function deleteNote(data, id) {
  data.splice(id, 1);
  saveData(data);
  updateNotes();
}

// Отменить действие
function cancelAction() {
  updateNotes();
}

// Изменение структуры блока записи (появление input для редактирования сообщения)
function startEditNote(data, id) {
  updateNotes();
  currentRecords[id].innerHTML = "";
  currentRecords[id].insertAdjacentHTML(
    "beforeend",
    getEditRecord(data[id], id)
  );
}

// Редактирование текста в текущей заметке
function saveEditNote(data, id) {
  const editInput = document.querySelector(".notes__input.notes__input--edit"); // ref на input для редактирования сообщения

  if (editInput && editInput.value) {
    if (editInput.value.length >= 3 && editInput.value.length <= 50) {
      data[id].text = editInput.value.trim();
      saveData(data);
      updateNotes();
    } else {
      editInput.focus();
      showErrorAlert();
    }
  }
}

// Ядро программы
const App = () => {
  initData();
  updateNotes();

  btn.addEventListener("click", addNote);

  // Текущий набор обработчиков
  const eventHandlers = {
    remove: (id) => {
      deleteNote(getData(), id);
    },
    update: (id) => {
      startEditNote(getData(), id);
    },
    save: (id) => {
      saveEditNote(getData(), id);
    },
    cancel: cancelAction,
  };

  recordsList.addEventListener("click", (e) => {
    const { type, id } = e.target.dataset;
    const handler = eventHandlers[type];
    if (handler) {
      handler(id);
    }
  });
};

App();
