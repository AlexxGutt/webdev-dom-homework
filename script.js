const liElement = document.querySelector('.comment')
    const buttonEl = document.querySelector('.add-form-button')
    const ulElement = document.querySelector('.comments')
    const nameUser = document.querySelector('.add-form-name')
    const textUser = document.querySelector('.add-form-text')
    

    const userComments = [
      { name: 'Глеб Фокин',
        text: 'Это будет первый комментарий на этой странице',
        date: '12.02.22 12:18',
        likes: 3,
        iconLike: false,
      },

      { name: 'Варвара Н.',
        text: 'Мне нравится как оформлена эта страница! ❤',
        date: '13.02.22 19:22',
        likes: 75,
        iconLike: false,
      }
    ];

    const likeButton = () => {
      const likeButtonElements = document.querySelectorAll('.like-button');

      for (const likeButtonElement of likeButtonElements) {
        likeButtonElement.addEventListener('click', (event) => {
          event.stopPropagation();

          const indexLike = likeButtonElement.dataset.index;
          
          if (userComments[indexLike].iconLike === false) {
            userComments[indexLike].likes++;
            userComments[indexLike].iconLike = true;
            renderUserComments();
          } else {
            userComments[indexLike].likes--;
            userComments[indexLike].iconLike = false;
            renderUserComments();
          }
        });
      }
    };

    const authorQuote = () => {

      const commentElements = document.querySelectorAll('.comment');

      for (const commentElement of commentElements) {
        commentElement.addEventListener('click', () => {
          const authorQuote = commentElement.dataset.quote;

          textUser.value = `Цитируем:\n❝${userComments[authorQuote].name}\n${userComments[authorQuote].text}❞`;
        });
      };
    }

    const renderUserComments = () => {
      const UserCommetnsHtml = userComments.map((userComment, index) => {
        return `
          <li data-quote="${index}" class="comment">
            <div class="comment-header">
              <div>${userComment.name}</div>
              <div>${userComment.date}</div>
            </div>
            <div class="comment-body">
              <div class="comment-text">${userComment.text}</div>
            </div>
            <div class="comment-footer">
              <div class="likes">
                <span class="likes-counter">${userComment.likes}</span>
                <button data-index="${index}" class="like-button ${userComment.iconLike? '-active-like' : ''}"></button>
              </div>
            </div>
          </li>
        `;
      }).join("");
        
      
      ulElement.innerHTML = UserCommetnsHtml;

      likeButton();
      authorQuote();
    }
    
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