import { updateUserComments, userComments } from './users.js'
import { renderUserComments } from './renderComments.js'
import { textUser, nameUser, buttonEl } from './variables.js'
import { sanitizeHtml } from './sanitizeHtml.js'

export const getNewComments = () => {
    fetch('https://wedev-api.sky.pro/api/v1/alex-gutt/comments')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            updateUserComments(data.comments)
            renderUserComments()
        })
}
export const likeButton = () => {
    const likeButtonElements = document.querySelectorAll('.like-button')

    for (const likeButtonElement of likeButtonElements) {
        likeButtonElement.addEventListener('click', (event) => {
            event.stopPropagation()

            const indexLike = likeButtonElement.dataset.index

            if (userComments[indexLike].isLiked === false) {
                userComments[indexLike].likes++
                userComments[indexLike].isLiked = true
                renderUserComments()
            } else {
                userComments[indexLike].likes--
                userComments[indexLike].isLiked = false
                renderUserComments()
            }
        })
    }
}

export const authorQuote = () => {
    const commentElements = document.querySelectorAll('.comment')

    for (const commentElement of commentElements) {
        commentElement.addEventListener('click', () => {
            const authorQuote = commentElement.dataset.quote

            textUser.value = `Цитируем:\n❝${userComments[authorQuote].author.name}\n${userComments[authorQuote].text}❞`
        })
    }
}

export const addComment = () => {
    buttonEl.addEventListener('click', function () {
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

        let dateTime = new Date()
        dateTime =
            dateTime.toLocaleDateString('ru-RU', {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit',
            }) +
            ' ' +
            dateTime.toLocaleTimeString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit',
            })

        const newComment = {
            name: sanitizeHtml(nameUser.value),
            text: sanitizeHtml(textUser.value),
            date: dateTime,
            likes: 0,
            isLiked: false,
        }

        fetch('https://wedev-api.sky.pro/api/v1/alex-gutt/comments', {
            method: 'POST',
            body: JSON.stringify(newComment),
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                if (data.result === 'ok') {
                    getNewComments()
                }
            })

        renderUserComments()

        nameUser.value = ''
        textUser.value = ''
    })
}
