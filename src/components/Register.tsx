import React, {FC, useState} from "react";
import {Step, Users} from "../types";
import {SubmitHandler, useForm} from "react-hook-form";

type InputsRegister = {
    fullName: string;
    email: string;
    password: string;
    passwordCheck: string;
    serverError: string;
}

const Register: FC<Step> = ({users, setStep}) => {
    const [type, setType] = useState<boolean>(true)
    const {register, handleSubmit, formState: {errors, isSubmitSuccessful}, setError, clearErrors} = useForm<InputsRegister>()

    const changeType = (e: React.MouseEvent<HTMLButtonElement>) => {
        setType(!type)
    }

    const step = (e: React.MouseEvent, step: string) => {
        setStep(step)
    }

    const onSubmit: SubmitHandler<InputsRegister> = data => {
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

    const className = (filedName: keyof InputsRegister) => {
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
            <h1 className='title title--login'>Создать аккаунт</h1>
            <span className='description'>Пожалуйста, войдите в ваш аккаунт для доступа к панели управления сетевой безопасностью.</span>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>

                <label className='form_label'>
                    <span className='form_name'>Имя пользователя :</span>
                    <input className={className("fullName")}
                           type="text" {...register("fullName", {required: true})}/>
                    {errors.fullName && <span className='form_error'>Обязательно к заполнению</span>}
                </label>
                <label className='form_label'>
                    <span className='form_name'>Имя пользователя :</span>
                    <input className={className("email")}
                           type="text" {...register("email", {required: true})}/>
                    {errors.email && <span className='form_error'>Обязательно к заполнению</span>}
                    <p {...register("serverError")} className='form_server-error'>{errors.serverError?.message}</p>
                </label>
                <label className='form_label'>
                    <span className='form_name'>Пароль :</span>
                    <input className={className('password')}
                           type={type ? "password" : "text"}  {...register("password", {required: true})}
                           onChange={clearError}/>
                    {errors.password && <span className='form_error'>Обязательно к заполнению</span>}
                    {type ? <button className='form_icon form_icon-hide' type='button' onClick={changeType}>
                        </button>
                        :
                        <button className='form_icon' type='button' onClick={changeType}>
                        </button>}
                </label>
                <label className='form_label'>
                    <span className='form_name'>Пароль :</span>
                    <input className={className('passwordCheck')}
                           type={type ? "password" : "text"}  {...register("passwordCheck", {required: true})}
                           onChange={clearError}/>
                    {errors.passwordCheck && <span className='form_error'>Обязательно к заполнению</span>}
                    {type ? <button className='form_icon form_icon-hide' type='button' onClick={changeType}>
                        </button>
                        :
                        <button className='form_icon' type='button' onClick={changeType}>
                        </button>}
                </label>
                <button className='button' type='submit'>Зарегистрироваться</button>
            </form>
            <div className='action' onClick={e => step(e, 'register')}>
                <span className='question'>Уже есть аккаунт?</span>
                <span>Войти</span>
            </div>
            <div className='links'>
                <a className='link link--dot' href=''>Работа с персональными данными</a>
                <a className='link' href=''>Правила</a>
            </div>
        </>
    )
}

export default Register;