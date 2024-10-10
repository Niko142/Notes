let butt = document.querySelector('.send');
let comment = document.querySelector('.commenting');
let list = document.querySelector('.list');
const input = document.querySelector('#notes');
let note = document.getElementsByClassName('note');
const updateInput = document.querySelector('.up');

//Исходный массив, в который добавляются новые заметки
let arr = [{title: 'Сделать Колоду'}, {title: 'Купить портфель'},];

function renderNotes() {
    for (let i = 0; i < arr.length; i++) {
        list.insertAdjacentHTML('beforeend', getNote(arr[i], i))
    }
}

renderNotes();

//Обработчик, который добавляет новую заметку при нажатии на кнопку
butt.onclick = function() {
    list.innerHTML = '';

    const notes = {
        title: input.value,
    }

    if (input.value) {
        arr.push(notes);
        renderNotes()
    }

    else {return null}

    input.value = '';
}

list.onclick = function(event) {
    if(event.target.dataset.type == 'remove') {
        list.innerHTML = '';
        arr.splice(event.target.dataset.id, 1);
        renderNotes();
    }
    else if (event.target.dataset.type == 'update') {
        note[event.target.dataset.id].innerHTML = '';
        note[event.target.dataset.id].insertAdjacentHTML('beforeend', getUpdateNotes(arr[event.target.dataset.id], event.target.dataset.id));
    }

    else if (event.target.dataset.type == 'save') {
        if (up.value) {
            arr[event.target.dataset.id].title = up.value;
            list.innerHTML = '';
            renderNotes();
        }
    }
}

    function getNote(value, id) {
        return `
        <div class='note' data-id = ${id}>
            <span class='text'>${value.title}</span>
            <button class='update' data-id = ${id} data-type = 'update'>Редактировать</button>
            <button class='delete' data-id = ${id} data-type = 'remove'>Удалить</button>
        </div>
        `
    }

    function getUpdateNotes(value, id) {
        return `
        <div class='updating' data-id = ${id}>
            <input type='text' id='up' value = '${value.title}' ></input>
            <button class='add' data-id = ${id} data-type = 'save'>Сохранить</button>
        </div>
        `
    }


