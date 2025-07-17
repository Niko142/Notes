export const templates = {
  // Инициализация заметки в формате HTML
  getRecord: (note, id) => {
    return `
      <li class="notes__item" data-note-id=${id}>
        <p class="notes__text">${note.text}</p>
        <menu class="btn__toolbar">
          <button class="btn btn--update" data-id=${id} data-type="edit">Редактировать</button>
          <button class="btn btn--delete" data-id=${id} data-type="delete">Удалить</button>
        </menu>
      </li>
    `;
  },

  // Инициализация блока редактирования заметки в формате HTML
  getEditRecord: (note, id) => {
    return `
      <input type="text" class="notes__input notes__input--edit" value="${note.text}"></input>
      <menu class='btn__toolbar'>
        <button class="btn btn--save" data-id=${id} data-type="save">Сохранить</button>
        <button class="btn btn--cancel" data-id=${id} data-type="cancel">Отмена</button>
      </menu>
    `;
  },
};
