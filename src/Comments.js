import './Style.css';

let butt = document.querySelector('.send');
let list = document.querySelector('.list');
const input = document.querySelector('#notes');
let note = document.getElementsByClassName('note');

// Проверка на наличие ключа
function checkData() {
    const checking = localStorage.getItem('data');
    if (!checking) {
        localStorage.setItem('data', JSON.stringify([{title: 'Первая заметка'}]))
    }

}

checkData();

// Последующий вывод
const parsing = JSON.parse(localStorage.data);


function renderNotes() {
    list.innerHTML = '';
    localStorage.setItem('data', JSON.stringify(parsing));
    for (let i = 0; i < parsing.length; i++) {
        list.insertAdjacentHTML('beforeend', getNote(parsing[i], i))
    }
    if (parsing.length === 0) {
        list.innerHTML = `<p style='font-size: 30px; margin: 0'>Заметок нет<p>`;
    }

}

renderNotes();


//Обработчик, который добавляет новую заметку при нажатии на кнопку
butt.onclick = function() {
    const notes = {
        title: input.value,
    }

    if (input.value.length >= 5 && input.value.length <= 50) {
        list.innerHTML = '';
        parsing.push(notes);
        renderNotes();
    }

    else {input.focus(); viewAlert();}

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
            if (up.value.length >= 3 && up.value.length <= 50) {
                parsing[id].title = up.value;
                list.innerHTML = '';
                renderNotes();
            }
            else {
                up.focus();
                viewAlert();
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
            <p class='text'>${value.title}</p>
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

    function viewAlert() {
        const alertBlock = document.createElement('div');
        alertBlock.className = 'alert';
        
        const text = document.createElement('span');
        text.style.cssText = ``;
        text.textContent = 'Ошибка, недопустимый размер строки'

        alertBlock.appendChild(text);
        document.body.append(alertBlock);

        setTimeout(()=> alertBlock.remove(), 3500)
    }



