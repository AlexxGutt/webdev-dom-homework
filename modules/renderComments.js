import { userComments } from './users.js'
import { likeButton, authorQuote } from './initListeners.js'
import { ulElement } from './variables.js'
export const renderUserComments = () => {
    const UserCommetnsHtml = userComments
        .map((userComment, index) => {
            return `
        <li data-quote="${index}" class="comment">
          <div class="comment-header">
            <div>${userComment.author.name}</div>
            <div>${userComment.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">${userComment.text}</div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${userComment.likes}</span>
              <button data-index="${index}" class="like-button ${userComment.isLiked ? '-active-like' : ''}"></button>
            </div>
          </div>
        </li>
      `
        })
        .join('')

    ulElement.innerHTML = UserCommetnsHtml

    likeButton()
    authorQuote()
}
