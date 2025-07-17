// Фильтрация записей на основе значений из поля поиска
export function filterNotes(data, searchQuery) {
  if (!searchQuery.trim()) {
    return data;
  }

  const searchText = searchQuery.toLowerCase();
  return data.filter((record) =>
    record.text.toLowerCase().includes(searchText)
  );
}

// Очистка input для поиска
export function clearSearchInput(searchInput, updateCallback) {
  searchInput.value = "";
  updateCallback();
}
