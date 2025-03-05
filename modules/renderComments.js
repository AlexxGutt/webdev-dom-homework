import { userComments } from './users.js'
import { likeButton, authorQuote, formatDate } from './initListeners.js'

export const renderUserComments = () => {
    const ulElement = document.querySelector('.comments')

    const UserCommetnsHtml = userComments
        .map((userComment, index) => {
            const formattedDate = formatDate(userComment.date)
            return `
      <li data-quote="${index}" class="comment">
        <div class="comment-header">
          <div>${userComment.name}</div>
          <div>${formattedDate}</div>
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
