import React, {FC, useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {Step, Users} from "../types";

type InputsReset = {
    password: string;
    passwordCheck: string;
    invalidPassword: string
}

const Reset: FC<Step> = ({users, setStep}) => {
    const {register, handleSubmit, formState: {errors, isSubmitSuccessful}, setError, getValues, clearErrors} = useForm<InputsReset>()

    const step = (e: React.MouseEvent, step: string) => {
            setStep(step)
    }

    const onSubmit: SubmitHandler<InputsReset> = data => {

        if (getValues().passwordCheck === getValues().password) {
            setStep('success')
        } else {
            setError('invalidPassword', {
                type: "custom",
                message: 'Пароли не совпадают'
            })
        }

    };

    const className = (filedName: keyof InputsReset): string => {

        if (errors[filedName] && errors[filedName]?.type === "minLength") {
            return 'form_input  form_input--yellow'
        }

        if (errors[filedName]) {
            return 'form_input  form_input--error'
        }

        if (isSubmitSuccessful) {
            return 'form_input form_input--success'
        }

        return 'form_input'
    }

    const clearError = (): void => {
        clearErrors('invalidPassword')
    }

    return (
        <>
            <h1 className='title title--reset'>Восстановить пароль</h1>
            <span className='description'>Проверка по Email завершена с успехом. Пожалуйста, укажите новый пароль.</span>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
                <label className='form_label form_label-password'>
                    <span className='form_name'>Пароль :</span>
                    <input className={className('password')}
                           type='password'  {...register("password", {required: true, minLength: 6})}
                    />
                    {errors.password && errors.password.type === "required" &&
                    <span className='form_error'>Обязательно к заполнению</span>}
                    {errors.password && errors.password.type === "minLength" &&
                    <span className='form_error form_error--yellow'>Пожалуйста, введите не менее 6 символов</span>}
                </label>
                <label className='form_label form_label-password'>
                    <span className='form_name'>Подтвердить пароль :</span>
                    <input className={className('passwordCheck')}
                           type='password'  {...register("passwordCheck", {required: true})} onChange={clearError}/>
                    {errors.passwordCheck && errors.passwordCheck.type === "required" &&
                    <span className='form_error'>Обязательно к заполнению</span>}
                    {errors.invalidPassword &&
                    <span className='form_server-error'>{errors.invalidPassword?.message}</span>}
                </label>
                <button className='button' type='submit'>Сбросить пароль</button>
            </form>
            <div className='action' onClick={(e) => step(e, 'login')}>
                <span className='question'>Вернуться на</span>
                <span>Вход</span>
            </div>
            <div className='links'>
                <a className='link link--dot' href=''>Работа с персональными данными</a>
                <a className='link' href=''>Правила</a>
            </div>
        </>
    );
};

export default Reset;