import React, {FC, useState} from "react";
import {Step, Users} from "../types";
import {SubmitHandler, useForm} from "react-hook-form";
import * as yup from "yup";
// @ts-ignore
import {yupResolver} from "@hookform/resolvers/yup";


const schema = yup.object({
    fullName: yup.string().required('Обязательно к заполнению'),
    email: yup.string().email('Некорректный email').required('Обязательно к заполнению'),
    password: yup.string().required('Обязательно к заполнению').min(6, 'Пароль должен быть более 6 символов'),
    passwordCheck: yup.string().oneOf([yup.ref('password'), null], 'Пароли не совпадают').required('Обязательно к заполнению')
}).required();

type InputsRegister = {
    fullName: string;
    email: string;
    password: string;
    passwordCheck: string;
}

type PasswordType = {
    password: boolean;
    passwordCheck: boolean;
}

const Register: FC<Step> = ({users, setStep}) => {
    const [type, setType] = useState<PasswordType>({
        password: true,
        passwordCheck: true
    })
    const {register, handleSubmit, formState: {errors, isSubmitSuccessful}, setError, clearErrors} = useForm<InputsRegister>({
        resolver: yupResolver(schema)
    })

    const changeType = (e: React.MouseEvent<HTMLButtonElement>, field: keyof PasswordType) => {
        setType((prevState => {
            return {
                ...prevState, [field]: !prevState[field]
            }
        }))

    }

    const step = (e: React.MouseEvent, step: string) => {
        setStep(step)
    }

    const onSubmit: SubmitHandler<InputsRegister> = data => {
        if (!data.fullName.trim()) {
            setError('fullName', {
                type: "required",
                message: 'Обязательно к заполнению'
            })
            return
        }

        const user: Users = users.filter(obj => obj.email === data.email.trim())[0]

        if (user === undefined) {
            alert('Регистрация успешна')
        } else {
            setError('email', {
                type: "custom",
                message: 'Пользователь с такой почтой уже существует'
            })
        }

    };

    const className = (filedName: keyof InputsRegister) => {

        if (errors[filedName] && errors[filedName]?.type === "min") {
            return 'form_input  form_input--yellow'
        }

        if (errors[filedName] || errors[filedName]?.type === 'custom') {
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
            <h1 className='title title--register'>Создать аккаунт</h1>
            <span className='description'>Пожалуйста, войдите в ваш аккаунт для доступа к панели управления сетевой безопасностью.</span>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>

                <label className='form_label'>
                    <span className='form_name'>Имя пользователя :</span>
                    <input className={className("fullName")}
                           type="text" {...register("fullName")}/>
                    <p className='form_error'>{errors.fullName?.message}</p>
                </label>

                <label className='form_label'>
                    <span className='form_name'>Email :</span>
                    <input className={className("email")}
                           type="text" {...register("email")}/>
                    <p className='form_error'>{errors.email?.message}</p>
                </label>

                <label className='form_label'>
                    <span className='form_name'>Пароль :</span>
                    <input className={className('password')}
                           type={type.password ? "password" : "text"}  {...register("password")}
                           onChange={clearError}/>
                    {errors.password?.type === 'min' ?
                        <p className='form_error form_error--yellow'>{errors.password?.message}</p> :
                        <p className='form_error'>{errors.password?.message}</p>}
                    {type.password ? <button className='form_icon form_icon-hide' type='button'
                                             onClick={(e) => changeType(e, 'password')}>
                        </button>
                        :
                        <button className='form_icon' type='button' onClick={(e) => changeType(e, 'password')}>
                        </button>}
                </label>

                <label className='form_label'>
                    <span className='form_name'>Подтвердить пароль :</span>
                    <input className={className('passwordCheck')}
                           type={type.passwordCheck ? "password" : "text"}  {...register("passwordCheck")}
                           onChange={clearError}/>
                    <p className='form_error'>{errors.passwordCheck?.message}</p>
                    {type.passwordCheck ? <button className='form_icon form_icon-hide' type='button'
                                                  onClick={(e) => changeType(e, 'passwordCheck')}>
                        </button>
                        :
                        <button className='form_icon' type='button' onClick={(e) => changeType(e, 'passwordCheck')}>
                        </button>}
                </label>

                <button className='button' type='submit'>Зарегистрироваться</button>
            </form>
            <div className='action' onClick={e => step(e, 'login')}>
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