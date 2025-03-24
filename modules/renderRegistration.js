import { setToken, setName, registration } from './api.js'
import { fetchAndRenderComments } from '../index.js'
import { renderLogin } from './renderLogin.js'
export const renderRegistration = () => {
    const container = document.querySelector('.container')

    const loginHtml = `
    <div class="comment">
    <p class="title">Форма регистрации</p>
                <div class="header">
                    <input
                        type="text"
                        class="name add-form-name-l"
                        placeholder="Имя"
                    />
                    <input
                        type="text"
                        class="login add-form-name-l"
                        placeholder="Логин"
                    />
                    <input
                        type="password"
                        class="password add-form-name-l"
                        placeholder="Пароль"
                    />
                </div>
                <div class="footer">
                    <button class="enter add-form-button">Войти</button>
                    <button class="reg add-form-button">
                        Зарегистрироваться
                    </button>
                </div>
    </div>`

    container.innerHTML = loginHtml

    document.querySelector('.enter').addEventListener('click', () => {
        renderLogin()
    })

    const nameEl = document.querySelector('.name')
    const loginEl = document.querySelector('.login')
    const passwordEl = document.querySelector('.password')
    const submitButton = document.querySelector('.reg')

    submitButton.addEventListener('click', () => {
        registration(nameEl.value, loginEl.value, passwordEl.value)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data)
                setToken(data.user.token)
                setName(data.user.name)
                fetchAndRenderComments()
            })
    })
}
