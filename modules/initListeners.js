import {userComments} from "./users.js";
import {renderUserComments} from "./renderComments,js";

export const likeButton = () => {
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

export const authorQuote = () => {

    const commentElements = document.querySelectorAll('.comment');

    for (const commentElement of commentElements) {
      commentElement.addEventListener('click', () => {
        const authorQuote = commentElement.dataset.quote;

        textUser.value = `Цитируем:\n❝${userComments[authorQuote].name}\n${userComments[authorQuote].text}❞`;
      });
    };
};

