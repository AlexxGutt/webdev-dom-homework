import { renderUserComments } from './modules/renderComments.js'
import { addComment } from './modules/initListeners.js'
import { updateUserComments } from './modules/users.js'

fetch('https://wedev-api.sky.pro/api/v1/alexxgutt/comments')
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
        updateUserComments(data.comments)
        renderUserComments()
    })

addComment()
