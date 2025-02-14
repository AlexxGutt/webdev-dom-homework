import { renderUserComments } from './modules/renderComments.js'
import { addComment } from './modules/initListeners.js'

fetch('https://wedev-api.sky.pro/api/v1/alexxgutt/comments')
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
    })
renderUserComments()
addComment()
