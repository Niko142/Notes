import './Style.css';

let butt = document.querySelector('.send');
// let comment = document.querySelector('.commenting');
let list = document.querySelector('.list');
const input = document.querySelector('#notes');
let note = document.getElementsByClassName('note');

// Последующий вывод
const parsing = JSON.parse(localStorage.data);

function renderNotes() {
    for (let i = 0; i < parsing.length; i++) {
        list.insertAdjacentHTML('beforeend', getNote(parsing[i], i) /*getNote(arr[i], i)*/)
    }
    if (parsing.length === 0) {
        list.innerHTML = `<p style='font-size: 30px; margin: 0'>Заметок нет<p>`;
    }
}


//Обработчик, который добавляет новую заметку при нажатии на кнопку
butt.onclick = function() {
    const notes = {
        title: input.value,
    }

    if (input.value) {
        list.innerHTML = '';
        parsing.push(notes);
        localStorage.setItem('data', JSON.stringify(parsing));
        renderNotes();
    }

    else {return }

    input.value = '';
}

list.onclick = function(event) {
    const {type, id} = event.target.dataset;
    if(type === 'remove') {
        list.innerHTML = '';
        parsing.splice(id, 1);
        renderNotes();
    }
    else if (type === 'update') {
        list.innerHTML = '' //Сделано для того, чтобы не допустить открытия 2 окон редактирования
        renderNotes();

        note[id].innerHTML = '';
        note[id].insertAdjacentHTML('beforeend', getUpdateNotes(parsing[id], id));
    }

    else if (type === 'save') {
        if (up.value) {
            if (up.value.length >= 3 && up.value.length <= 50){
                parsing[id].title = up.value;
                list.innerHTML = '';
                renderNotes();
            }
            else {

                up.focus();
            }
        }
        
    }

    else if (type == 'cancel') {
        list.innerHTML = '';
        renderNotes();
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
            <button class='cancel' data-id = ${id} data-type = 'cancel'>Отмена</button>
        </div>
        `
    }




