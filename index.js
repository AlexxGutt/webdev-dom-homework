import {renderUserComments} from "./modules/renderComments.js";
import {buttonEl, textUser, nameUser} from "./modules/variables.js";
import {userComments} from "./modules/users.js";

renderUserComments();

buttonEl.addEventListener('click', function() {
      
    if (nameUser.value === '' || nameUser.value === ' ') {
      nameUser.classList.add("error");
      nameUser.placeholder = "Это поле не может быть пустым!"
      return;
    } else if (textUser.value === '' || textUser.value === ' ') {
      textUser.classList.add("error");
      textUser.placeholder = "Это поле не может быть пустым!"
      return;
    } else {
      nameUser.classList.remove("error");
      textUser.classList.remove("error");
      nameUser.placeholder = "Введите ваше имя"
      textUser.placeholder = "Введите ваш коментарий"
    }
    
    let dateTime = new Date();
    dateTime = dateTime.toLocaleDateString('ru-RU', { 
      year: '2-digit', 
      month: '2-digit', 
      day: '2-digit' 
    }) + ' ' + dateTime.toLocaleTimeString('ru-RU', { 
    hour: '2-digit', 
    minute: '2-digit'});
    
    userComments.push({name: nameUser.value.replaceAll('<', '	&#8249;').replaceAll('>', '&#8250;'), text: textUser.value.replaceAll('<', '	&#8249;').replaceAll('>', '&#8250;'), date: dateTime, likes: 0, iconLike: false});
    renderUserComments();

    nameUser.value = '';
    textUser.value = '';
});