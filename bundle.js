(()=>{"use strict";let t=document.querySelector(".send"),e=document.querySelector(".list");const n=document.querySelector("#notes");let a=document.getElementsByClassName("note");localStorage.getItem("data")||localStorage.setItem("data",JSON.stringify([{title:"Первая заметка"}]));const l=JSON.parse(localStorage.data);function o(){e.innerHTML="",localStorage.setItem("data",JSON.stringify(l));for(let n=0;n<l.length;n++)e.insertAdjacentHTML("beforeend",`\n        <div class='note' data-id = ${t=n}>\n            <p class='text'>${l[n].title}</p>\n            <button class='update' data-id = ${t} data-type = 'update'>Редактировать</button>\n            <button class='delete' data-id = ${t} data-type = 'remove'>Удалить</button>\n        </div>\n        `);var t;0===l.length&&(e.innerHTML="<p style='font-size: 30px; margin: 0'>Заметок нет<p>")}function c(){const t=document.createElement("div");t.className="alert";const e=document.createElement("span");e.style.cssText="",e.textContent="Ошибка, недопустимый размер строки",t.appendChild(e),document.body.append(t),setTimeout((()=>t.remove()),3500)}o(),t.onclick=function(){const t={title:n.value};n.value.length>=5&&n.value.length<=50?(e.innerHTML="",l.push(t),o()):(n.focus(),c()),n.value=""},e.onclick=function(t){const{type:n,id:d}=t.target.dataset;"remove"===n?(e.innerHTML="",l.splice(d,1),o()):"update"===n?(e.innerHTML="",o(),a[d].innerHTML="",a[d].insertAdjacentHTML("beforeend",function(t,e){return`\n        <div class='updating' data-id = ${e}>\n            <input type='text' id='up' value = '${t.title}' ></input>\n            <button class='add' data-id = ${e} data-type = 'save'>Сохранить</button>\n            <button class='cancel' data-id = ${e} data-type = 'cancel'>Отмена</button>\n        </div>\n        `}(l[d],d))):"save"===n?up.value&&(up.value.length>=3&&up.value.length<=50?(l[d].title=up.value,e.innerHTML="",o()):(up.focus(),c())):"cancel"==n&&(e.innerHTML="",o())}})();