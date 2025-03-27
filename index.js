import { fetchComments } from './modules/api.js'
import { updateUserComments } from './modules/users.js'
import { renderUserComments } from './modules/renderComments.js'

export const fetchAndRenderComments = (firstLoading) => {
    if (firstLoading) {
        document.querySelector('.container').innerHTML =
            `<p>Идет загрузка комментариев...</p>`
    }

    fetchComments().then((data) => {
        updateUserComments(data)
        renderUserComments()
    })
}

fetchAndRenderComments(true)
