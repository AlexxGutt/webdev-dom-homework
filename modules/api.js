const host = 'https://wedev-api.sky.pro/api/v1/al-gutt'

export const fetchComments = () => {
    return fetch(host + '/comments')
        .then((response) => {
            return response.json()
        })
        .then((responseData) => {
            const appComments = responseData.comments.map((userComment) => {
                return {
                    name: userComment.author.name,
                    date: new Date(userComment.date),
                    isLiked: false,
                    likes: userComment.likes,
                    text: userComment.text,
                }
            })
            return appComments
        })
}

export const postComments = (text, name) => {
    return fetch(host + '/comments', {
        method: 'POST',
        body: JSON.stringify({
            text,
            name,
        }),
    }).then(() => {
        return fetchComments()
    })
}
