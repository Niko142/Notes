import "./style.css";

import { storage } from "./services/storage";
import showErrorAlert from "./components/Alert";
import { clearSearchInput } from "./utils/utils";
import { eventHandlers } from "./services/eventHandlers";
import { renderEditNote, renderNotes } from "./services/renderNotes";
import { paginationService } from "./services/pagination";

const addButton = document.querySelector(".btn.btn--add");
const prevBtn = document.querySelector(".pagination__btn--prev");
const nextBtn = document.querySelector(".pagination__btn--next");
const recordsList = document.querySelector(".notes__list");
const addInput = document.querySelector("#add-note");
const searchInput = document.querySelector("#search-note");

// Обработчик формирования и обновления списка заметок
function handleUpdateNotes(filteredData = null, resetPage = false) {
  if (resetPage) paginationService.resetPage();
  renderNotes(recordsList, searchInput, filteredData);
}

// Обработчик добавления новой заметки
async function handleAddNote() {
  const textValue = addInput.value.trim();
  const response = await eventHandlers.addNote(textValue);

  if (response.success) {
    searchInput.value = "";
    handleUpdateNotes();
  } else {
    addInput.focus();
    showErrorAlert(response?.error || "Ошибка: недопустимый раз записи");
  }
  addInput.value = "";
}

// Обработчик для удаления записи
function handeDeleteNote(id) {
  eventHandlers.deleteNote(id);
  handleUpdateNotes();
}

// Изменение структуры блока записи (появление input для редактирования сообщения)
function handleOpenEditHTML(id) {
  handleUpdateNotes();
  renderEditNote(id);
}

// Редактирование текста в текущей заметке
async function handleEditNote(id) {
  const editInput = document.querySelector(".notes__input.notes__input--edit"); // ref на input для редактирования сообщения
  const response = await eventHandlers.editNote(editInput, id);
  if (response.success) {
    searchInput.value = "";
    handleUpdateNotes();
  } else {
    editInput.focus();
    showErrorAlert(response?.error || "Ошибка: недопустимый формат записи");
  }
}

// Обработчик отмены действия
function handleCancelEdit() {
  handleUpdateNotes();
}

// Инициализация приложения
const App = () => {
  storage.initStorage();
  handleUpdateNotes();

  // Обработчик для добавления новой заметки по клику кнопки
  addButton.addEventListener("click", handleAddNote);

  // Текущий набор обработчиков
  const eventHandlers = {
    delete: (id) => {
      handeDeleteNote(id);
    },
    edit: (id) => {
      handleOpenEditHTML(id);
    },
    save: (id) => {
      handleEditNote(id);
    },
    cancel: handleCancelEdit,
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
      handleAddNote();
    }
  });

  // Обработчик поиска записей
  let searchTimeout = null;
  searchInput.addEventListener("input", () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(handleUpdateNotes, 300);
  });

  // Обработчик удаления картинки лупы при фокусе
  searchInput.addEventListener("focus", () => {
    searchInput.style.backgroundImage = "url('')";
  });

  // Обработчик возврата картинки лупы
  searchInput.addEventListener("blur", () => {
    if (searchInput.value.length === 0) {
      searchInput.style.backgroundImage = "url('./images/loupe.png')";
    }
  });

  // Обработчик для очистки поля поиска (изменить на подобие кнопки)
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      clearSearchInput(searchInput, handleUpdateNotes);
    }
  });

  // Обработчик рендера списка при возврате на предыдущую страницу
  prevBtn.addEventListener("click", () => {
    if (paginationService.prevPage()) {
      handleUpdateNotes();
    }
  });

  // Обработчик рендера списка при переключении на следующую страницу
  nextBtn.addEventListener("click", () => {
    if (paginationService.nextPage()) {
      handleUpdateNotes();
    }
  });
};

App();
