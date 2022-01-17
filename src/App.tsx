import React, {useState} from 'react';
import './App.css';
import Login from "./components/Login";
import Recover from "./components/Recover";
import {Users} from './types'
import Reset from "./components/Reset";
import Success from "./components/Success";
import Register from "./components/Register";

function App() {
    const users: Users[] = require('./users.json').users;
    const [step, setStep] = useState<string>('login')

    return (
        <div className="App">
            <a className='logo' href="#">
                <img src="assets/logo.svg" alt=""/>
            </a>
            <div className='hero'>
                <div className='hero_inner'>
                    <h2 className='hero_title'>Система управления событиями безопасности</h2>
                    <p className='hero_text'>
                        Система осуществляет сбор логов и метрик безопасности с инфраструктуры предприятия.
                        Предоставляет
                        удобный интерфейс поиска по событиям. Позволяет производить расширенную фильтрацию и корреляцию
                        событий информационной безопасности. Реализует автоматические реакции на подтверждённые
                        инциденты
                        информационной безопасности.
                    </p>
                </div>
            </div>
            <div className='section'>
                <div className='section_inner'>
                    {step === 'register' && <Register users={users} setStep={setStep}/>}
                    {step === 'login' && <Login users={users} setStep={setStep}/>}
                    {step === 'recover' && <Recover users={users} setStep={setStep}/>}
                    {step === 'reset' && <Reset users={users} setStep={setStep}/>}
                    {step === 'success' && <Success users={users} setStep={setStep}/>}
                </div>
            </div>
        </div>
    );
}

export default App;
