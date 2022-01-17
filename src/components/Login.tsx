import React, {FC, SetStateAction, useState, Dispatch} from 'react';
import {useForm, SubmitHandler} from "react-hook-form";
import {Step, Users} from '../types'

type InputsLogin = {
    fullName: string,
    password: string,
    serverError: string;
    checkbox: boolean
};

const Login: FC<Step> = ({users, setStep}) => {
    const [type, setType] = useState<boolean>(true)
    const {register, handleSubmit, formState: {errors, isSubmitSuccessful}, setError, clearErrors} = useForm<InputsLogin>({
        defaultValues: {
            fullName: ''
        }
    })

    const changeType = (e: React.MouseEvent<HTMLButtonElement>) => {
        setType(!type)
    }

    const step = (e: React.MouseEvent, step: string) => {
        setStep(step)
    }

    const onSubmit: SubmitHandler<InputsLogin> = data => {
        if (!data.fullName.trim()) {
            setError('fullName', {
                type: "required",
            })
            return
        }

        const user: Users = users.filter(obj => obj.fullName === data.fullName.trim())[0]

        if (user !== undefined && user.password === data.password) {
            alert('Вход успешен')
        } else {
            setError('serverError', {
                type: "custom",
                message: 'Неправильное имя пользователя или пароль'
            })
        }

    };

    const className = (filedName: keyof InputsLogin) => {
        if (errors[filedName]) {
            return 'form_input  form_input--error'
        }

        if (isSubmitSuccessful) {
            return 'form_input form_input--success'
        }

        return 'form_input'
    }

    const clearError = () => {
        clearErrors('password')
    }

    return (
        <>
            <h1 className='title title--login'>Вход </h1>
            <span className='description'>Введите пожалуйста учётные данные</span>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>

                <label className='form_label'>
                    <span className='form_name'>Имя пользователя :</span>
                    <input className={className("fullName")}
                           type="text" {...register("fullName", {required: true})}/>
                    {errors.fullName && <span className='form_error'>Обязательно к заполнению</span>}
                </label>
                <label className='form_label form_label-password'>
                    <span className='form_name'>Пароль :</span>
                    <input className={className('password')}
                           type={type ? "password" : "text"}  {...register("password", {required: true})}
                           onChange={clearError}/>
                    {errors.password && <span className='form_error'>Обязательно к заполнению</span>}
                    <p {...register("serverError")} className='form_server-error'>{errors.serverError?.message}</p>
                    {type ? <button className='form_icon form_icon-hide' type='button' onClick={changeType}>
                        </button>
                        :
                        <button className='form_icon' type='button' onClick={changeType}>
                        </button>}
                </label>

                <div className='form_choose'>
                    <label className='form_rememberMe'>
                        <input className='form_checkbox' type="checkbox" {...register("checkbox")}/>
                        <span className='form_rememberMe-text'>Запомнить</span>
                    </label>
                    <span onClick={e => step(e, 'recover')} className='form_recover'>Забыли пароль?</span>
                </div>
                <button className='button' type='submit'>Войти</button>
            </form>
            <div className='action' onClick={e => step(e, 'register')}>
                <span className='question'>Не зарегистрированы?</span>
                <span>Создать аккаунт</span>
            </div>
            <div className='links'>
                <a className='link link--dot' href=''>Работа с персональными данными</a>
                <a className='link' href=''>Правила</a>
            </div>
        </>
    );
};

export default Login;