import React from 'react';
import './login.css'

const Login = () => {
    return (
        <div className='login'>
            <h1 className='title'>Вход</h1>
            <span>Введите пожалуйста учётные данные</span>
            <form> 
                <label>
                    <span>Имя пользователя :</span>
                    <input type="text"/>
                </label>
                <label>
                    <span>Пароль :</span>
                    <input type="password"/>
                </label>
                <div>
                    <div>
                        <input type="checkbox"/>
                        <span>Запомнить</span>
                    </div>
                    <span>Забыли пароль?</span>
                </div>
                <button>Войти</button>
            </form>
            <div>
                <span>Не зарегистрированы?</span>
                <span>Создать аккаунт</span>
            </div>
            <span>Работа с персональными данными</span>
            <span>Правила</span>
        </div>
    );
};

export default Login;