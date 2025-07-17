import { storage } from "./storage";

export const eventHandlers = {
  // Метод добавления новой заметки
  addNote: async (textValue) => {
    try {
      if (textValue.length < 5 || textValue.length > 50) {
        return { success: false, error: "Ошибка: Недопустимый формат ввода" };
      }
      const data = storage.getDataFromStorage();
      const formData = {
        text: textValue,
      }; // Данные в необходимом формате, которые будут добавляться
      data.push(formData);
      storage.saveDataToStorage(data);
      return { success: true };
    } catch (err) {
      console.error(err);
      return {
        success: false,
        error: err?.message || "Произошла ошибка со стороны сервера",
      };
    }
  },

  // Метод удаления заметки
  deleteNote(id) {
    const data = storage.getDataFromStorage();
    data.splice(id, 1);
    storage.saveDataToStorage(data);
  },

  // Метод для редактирования сообщения в выбранной заметке
  editNote: async (textValue, id) => {
    try {
      if (!textValue?.value)
        return { success: false, error: "Поле не может быть пустым" };
      const textInputValue = textValue.value.trim();
      if (textInputValue.length < 3 || textInputValue.length > 50) {
        return {
          success: false,
          error: "Ошибка: поле не соответствует формату ввода",
        };
      }
      const data = storage.getDataFromStorage();
      data[id].text = textInputValue;
      storage.saveDataToStorage(data);
      return { success: true };
    } catch (err) {
      console.error(err);
      return {
        success: false,
        err: err?.message || "Произошла ошибка со стороны сервера",
      };
    }
  },
};
