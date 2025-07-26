const notesPerPage = 4;

// Основные состояния пагинации
let paginationState = {
  currentPage: 1,
  totalRecords: 1,
  totalItems: 0,
  notesPerPage: notesPerPage,
};

export const paginationService = {
  // Получение записей для текущей страницы
  getPaginatedData(data) {
    const startIndex =
      (paginationState.currentPage - 1) * paginationState.notesPerPage;
    const endIndex = startIndex + paginationState.notesPerPage;
    return data.slice(startIndex, endIndex);
  },

  // Пересчет страниц в зависимости от количества записей
  updateTotalItems(totalItems) {
    paginationState.totalItems = totalItems;
    paginationState.totalRecords = Math.ceil(
      totalItems / paginationState.notesPerPage
    );

    // Корректировка текущей страницы
    if (
      paginationState.currentPage > paginationState.totalRecords &&
      paginationState.totalRecords > 0
    ) {
      paginationState.currentPage = paginationState.totalRecords;
    }
    if (paginationState.currentPage < 1) {
      paginationState.currentPage = 1;
    }
  },
  // Перейти на следующую страницу
  nextPage() {
    if (paginationState.currentPage < paginationState.totalRecords) {
      paginationState.currentPage++;
      return true;
    }
    return false;
  },
  // Вернуться на предыдущую страницу
  prevPage() {
    if (paginationState.currentPage > 1) {
      paginationState.currentPage--;
      return true;
    }
    return false;
  },
  // Сброс имеющегося значения страницы и возврат на первую
  resetPage() {
    paginationState.currentPage = 1;
  },
  // Получение информации о текущем состоянии
  getPaginationState() {
    return {
      currentPage: paginationState.currentPage,
      totalRecords: paginationState.totalRecords,
      totalItems: paginationState.totalItems,
      notesPerPage: paginationState.notesPerPage,
      hasNextPage: paginationState.currentPage < paginationState.totalRecords,
      hasPrevPage: paginationState.currentPage > 1,
    };
  },
  // Изменение количества элементов на странице
  setNotesPerPage(notesPerPage) {
    paginationState.notesPerPage = notesPerPage;
    this.updateTotalItems(paginationState.totalItems); // Пересчет страниц
  },
};
