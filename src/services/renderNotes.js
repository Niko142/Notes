import { storage } from "./storage";
import { templates } from "../templates/templates";
import { filterNotes } from "../utils/utils";
import { paginationService } from "./pagination";
import updatePaginationUI from "../components/Pagination";

export function renderNotes(recordsList, searchInput, filteredData = null) {
  recordsList.innerHTML = "";

  const allData = filteredData || storage.getDataFromStorage();
  const searchQuery = searchInput.value.trim();

  const showData = searchQuery ? filterNotes(allData, searchQuery) : allData;

  paginationService.updateTotalItems(showData.length);
  const paginatedData = paginationService.getPaginatedData(showData);
  const { currentPage, totalRecords } = paginationService.getPaginationState();

  // Отрисовка значений текущей страницы и их общего количества
  updatePaginationUI(currentPage, totalRecords);

  if (paginatedData.length === 0) {
    const message = searchQuery
      ? `Заметки по запросу "${searchQuery}" не найдены...`
      : "Заметки отсутствуют...";
    recordsList.innerHTML = `<p style="font-size: 1.5rem;">${message}</p>`;
    return;
  }

  // Общее кол-во записей
  const allRecords = storage.getDataFromStorage();

  const recordsToHTML = paginatedData
    .map((note) => {
      const realIndex = allRecords.findIndex(
        (currentItem) => currentItem.text === note.text
      );
      return templates.getRecord(note, realIndex);
    })
    .join("");

  recordsList.insertAdjacentHTML("beforeend", recordsToHTML);
}

// Изменение структуры блока записи (появление input для редактирования сообщения)
export function renderEditNote(globalId) {
  const data = storage.getDataFromStorage();
  const noteItem = document.querySelector(`[data-note-id="${globalId}"]`);

  if (!noteItem) {
    console.warn(`Не найден <li> с data-note-id="${globalId}"`);
    return;
  }

  noteItem.innerHTML = "";
  noteItem.insertAdjacentHTML(
    "beforeend",
    templates.getEditRecord(data[globalId], globalId)
  );
}
