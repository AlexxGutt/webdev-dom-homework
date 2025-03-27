import { login, setToken, setName } from './api.js'
import { fetchAndRenderComments } from '../index.js'
import { renderRegistration } from './renderRegistration.js'
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

    document.querySelector('.reg').addEventListener('click', () => {
        renderRegistration()
    })

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
            .catch((error) => {
                if (error.message === 'Неверный логин или пароль...') {
                    alert('Неверный логин или пароль...')
                    loginEl.classList.add('error')
                    passwordEl.classList.add('error')
                }

                setTimeout(() => {
                    loginEl.classList.remove('error')
                    passwordEl.classList.remove('error')
                }, 3000)
            })
    })
}
