import { login, setToken, setName } from './api.js'
import { fetchAndRenderComments } from '../index.js'
export const renderLogin = () => {
    const container = document.querySelector('.container')

    const loginHtml = `
    <div class="comment">
    <p class="title">Форма входа</p>
                <div class="header">
                    <input
                        type="text"
                        class="login add-form-name-l"
                        placeholder="Логин"
                    />
                    <input
                        type="text"
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

    const loginEl = document.querySelector('.login')
    const passwordEl = document.querySelector('.password')
    const submitButton = document.querySelector('.enter')

    submitButton.addEventListener('click', () => {
        login(loginEl.value, passwordEl.value)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setToken(data.user.token)
                setName(data.user.name)
                fetchAndRenderComments()
            })
    })
}
