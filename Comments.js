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
    const notes = {
        title: input.value,
    }

    if (input.value) {
        list.innerHTML = '';
        arr.push(notes);
        renderNotes()
    }

    else {return }

    input.value = '';
}

list.onclick = function(event) {
    const {type, id} = event.target.dataset
    if(type == 'remove') {
        list.innerHTML = '';
        arr.splice(id, 1);
        renderNotes();
    }
    else if (type == 'update') {
        //Сделано для того, чтобы нельзя было открыть 2 окна редактирования
        list.innerHTML = ''
        renderNotes();

        note[id].innerHTML = '';
        note[id].insertAdjacentHTML('beforeend', getUpdateNotes(arr[id], id));
    }

    else if (type == 'save') {
        if (up.value) {
            arr[id].title = up.value;
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


