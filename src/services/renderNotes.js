import { storage } from "./storage";
import { templates } from "../templates/templates";
import { filterNotes } from "../utils/utils";

// Формирование и рендер списка заметок на основе полученных данных
export function renderNotes(recordsList, searchInput, filteredData = null) {
  recordsList.innerHTML = "";
  const data = filteredData || storage.getDataFromStorage();
  const searchQuery = searchInput.value.trim();

  const showData = searchQuery
    ? filterNotes(storage.getDataFromStorage(), searchQuery)
    : data;

  if (showData.length === 0) {
    const message = searchQuery
      ? `Заметки по запросу "${searchQuery}" не найдены...`
      : "Заметки отсутствуют...";
    recordsList.innerHTML = `<p style="font-size: 1.5rem;">${message}</p>`;
  }

  const allData = storage.getDataFromStorage(); // Данные о всех имеющихся записях

  const recordsToHTML = showData
    .map((note) => {
      const realIndex = allData.findIndex(
        (currentItem) => currentItem.text === note.text
      );
      return templates.getRecord(note, realIndex);
    })
    .join("");
  recordsList.insertAdjacentHTML("beforeend", recordsToHTML);
}

// Изменение структуры блока записи (появление input для редактирования сообщения)
export function renderEditNote(currentRecords, id) {
  const data = storage.getDataFromStorage();
  currentRecords[id].innerHTML = "";
  currentRecords[id].insertAdjacentHTML(
    "beforeend",
    templates.getEditRecord(data[id], id)
  );
}
