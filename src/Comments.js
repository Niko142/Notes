import "./Style.css";

let btn = document.querySelector(".btn.btn--add");
let recordsList = document.querySelector(".notes__list");
const addInput = document.querySelector("#add-note");
const searchInput = document.querySelector("#search-note");
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

// Логика, отвечающая за фильтрацию (на основе сравнения) 
function filterNotes(data, searchQuery) {
  if (!searchQuery.trim()) {
    return data;
  }

  const searchText = searchQuery.toLowerCase();
  return data.filter((record) =>
    record.text.toLowerCase().includes(searchText)
  );
}

// Формирование и рендер списка заметок на основе полученных данных
function updateNotes(filteredData = null) {
  recordsList.innerHTML = "";
  const data = filteredData || getData();
  const searchQuery = searchInput.value.trim();

  const showData = searchQuery ? filterNotes(getData(), searchQuery) : data;

  if (showData.length === 0) {
    const message = searchQuery
      ? `Заметки по запросу "${searchQuery}" не найдены...`
      : "Заметки отсутствуют ...";
    recordsList.innerHTML = `<p style="font-size: 1.5rem;">${message}</p>`;
  }

  const allData = getData(); // Данные о всех имеющихся записях

  const recordsToHTML = showData
    .map((note) => {
      const realIndex = allData.findIndex(
        (currentItem) => currentItem.text === note.text
      );
      return getRecord(note, realIndex);
    })
    .join("");
  recordsList.insertAdjacentHTML("beforeend", recordsToHTML);
}

// Создание всплывающего алерта при возникновении ошибок
const showErrorAlert = (message = "Ошибка: недопустимый размер записи") => {
  const alertBlock = document.createElement("div");
  alertBlock.className = "alert";

  const text = document.createElement("p");
  text.textContent = message;

  alertBlock.appendChild(text);
  document.body.append(alertBlock);

  // Подумать насчет того, что timeout то не удаляется
  setTimeout(() => alertBlock.remove(), 3500);
};

// Добавление новой заметки
function addNote() {
  const data = getData();
  const textValue = addInput.value.trim();

  // Данные в необходимом формате, которые будут добавляться
  const formData = {
    text: textValue,
  };

  if (textValue.length >= 5 && textValue.length <= 50) {
    data.push(formData);
    saveData(data);
    searchInput.value = "";
    updateNotes();
  } else {
    addInput.focus();
    showErrorAlert();
  }
  addInput.value = "";
}

// Удаление заметки
function deleteNote(data, id) {
  data.splice(id, 1);
  saveData(data);
  updateNotes();
}

// Отмена действия (при редактировании)
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
  if (editInput?.value) {
    const editInputValue = editInput.value.trim();
    if (editInputValue.length >= 3 && editInputValue.length <= 50) {
      data[id].text = editInputValue;
      saveData(data);
      searchInput.value = "";
      updateNotes();
    } else {
      editInput.focus();
      showErrorAlert();
    }
  }
}

// Очистка input для поиска
function clearSearchInput() {
  searchInput.value = "";
  updateNotes();
}

// Ядро программы
const App = () => {
  initData();
  updateNotes();

  // Обработчик для добавления новой заметки по клику кнопки
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

  // Обработчик для кнопок, закрепленных за каждой заметкой
  recordsList.addEventListener("click", (e) => {
    const { type, id } = e.target.dataset;
    const handler = eventHandlers[type];
    handler && handler(id);
  });

  // Обработчик для добавления заметки при нажатии "Enter"
  addInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addNote();
    }
  });

  // Обработчик поиска записей
  let searchTimeout = null;
  searchInput.addEventListener("input", () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(updateNotes, 300);
  });

  // Обработчик удаления картинки лупы при фокусе
  searchInput.addEventListener("focus", () => {
    searchInput.style.backgroundImage = "url('')";
  });

  // Обработчик возврата картинки лупы
  searchInput.addEventListener("blur", () => {
    if (searchInput.value.length === 0) {
      searchInput.style.backgroundImage = "url('loupe.png')";
    }
  });

  // Обработчик для очистки поля поиска (изменить на подобие кнопки)
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      clearSearchInput();
    }
  });
};

App();
