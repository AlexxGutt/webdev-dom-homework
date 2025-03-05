import { addComment } from './modules/initListeners.js'
import { fetchComments } from './modules/api.js'
import { updateUserComments } from './modules/users.js'
import { renderUserComments } from './modules/renderComments.js'

document.querySelector('.comments').innerHTML = 'Идет загрузка комментариев...'
fetchComments().then((data) => {
    updateUserComments(data)
    renderUserComments()
})

addComment()
