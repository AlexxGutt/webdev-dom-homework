import { userComments, updateUserComments } from './users.js'
import { renderUserComments } from './renderComments.js'
import { sanitizeHtml } from './sanitizeHtml.js'
import { postComments } from './api.js'

export const likeButton = () => {
    const likeButtonElements = document.querySelectorAll('.like-button')

    for (const likeButtonElement of likeButtonElements) {
        likeButtonElement.addEventListener('click', (event) => {
            event.stopPropagation()

            const indexLike = likeButtonElement.dataset.index

            if (userComments[indexLike].isLiked === true) {
                userComments[indexLike].likes--
                userComments[indexLike].isLiked = false
                renderUserComments()
            } else {
                userComments[indexLike].likes++
                userComments[indexLike].isLiked = true
                renderUserComments()
            }
        })
    }
}

export const authorQuote = () => {
    const commentElements = document.querySelectorAll('.comment')
    const textUser = document.querySelector('.add-form-text')

    for (const commentElement of commentElements) {
        commentElement.addEventListener('click', () => {
            const authorQuote = commentElement.dataset.quote

            textUser.value = `Цитируем:\n❝${userComments[authorQuote].name}\n${userComments[authorQuote].text}❞`
        })
    }
}

export const addComment = () => {
    const buttonEl = document.querySelector('.add-form-button')
    const nameUser = document.querySelector('.add-form-name')
    const textUser = document.querySelector('.add-form-text')

    buttonEl.addEventListener('click', () => {
        if (nameUser.value === '' || nameUser.value === ' ') {
            nameUser.classList.add('error')
            nameUser.placeholder = 'Это поле не может быть пустым!'
            return
        } else if (textUser.value === '' || textUser.value === ' ') {
            textUser.classList.add('error')
            textUser.placeholder = 'Это поле не может быть пустым!'
            return
        } else {
            nameUser.classList.remove('error')
            textUser.classList.remove('error')
            nameUser.placeholder = 'Введите ваше имя'
            textUser.placeholder = 'Введите ваш коментарий'
        }
        document.querySelector('.form-loading').style.display = 'block'
        document.querySelector('.add-form').style.display = 'none'

        postComments(
            sanitizeHtml(textUser.value),
            sanitizeHtml(nameUser.value),
        ).then((data) => {
            document.querySelector('.form-loading').style.display = 'none'
            document.querySelector('.add-form').style.display = 'flex'

            updateUserComments(data)
            renderUserComments()
            nameUser.value = ''
            textUser.value = ''
        })
    })
}

export const formatDate = (isoDateString) => {
    const date = new Date(isoDateString)
    const day = String(date.getUTCDate()).padStart(2, '0')
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    const year = date.getUTCFullYear()
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return `${day}.${month}.${year} ${hours}:${minutes}`
}
