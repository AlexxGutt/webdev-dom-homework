import { userComments } from './users.js'
import {
    likeButton,
    authorQuote,
    formatDate,
    addComment,
} from './initListeners.js'
import { renderLogin } from './renderLogin.js'
import { token, name } from './api.js'

export const renderUserComments = () => {
    const container = document.querySelector('.container')
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

    const addCommentsHtml = `
    <div class="add-form">
      <input
          type="text"
          class="add-form-name"
          placeholder="Введите ваше имя"
          readonly
          value="${name}"
      />
      <textarea
          type="textarea"
          class="add-form-text"
          placeholder="Введите ваш коментарий"
          rows="4"
      ></textarea>
      <div class="add-form-row">
          <button class="add-form-button">Написать</button>
      </div>
      <div class="form-loading">Комментарий добавляется...</div>
    </div>`

    const linkToLoginText = `<p>чтобы отправить комментарий, <span class="link-login">войдите</span></p>`

    const baseHtml = `<ul class="comments">${UserCommetnsHtml}</ul>
    ${token ? addCommentsHtml : linkToLoginText}`

    container.innerHTML = baseHtml

    if (token) {
        likeButton()
        authorQuote()
        addComment()
    } else {
        document.querySelector('.link-login').addEventListener('click', () => {
            renderLogin()
        })
    }
}
