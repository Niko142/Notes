export const storage = {
  // "Проверяем, есть ли заметки и само хранилище. Если нет — инициализируем новое"
  initStorage() {
    const isInit = localStorage.getItem("data");
    if (!isInit) {
      localStorage.setItem(
        "data",
        JSON.stringify([{ text: "Первая заметка" }])
      );
    }
  },

  // Получение данных из localStorage
  getDataFromStorage() {
    return JSON.parse(localStorage.getItem("data") || []);
  },

  // Сохранение данных в localStorage
  saveDataToStorage(data) {
    localStorage.setItem("data", JSON.stringify(data));
  },
};
