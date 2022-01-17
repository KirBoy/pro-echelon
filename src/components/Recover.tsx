import React, {FC} from 'react';
import {Step, Users} from "../types";
import {SubmitHandler, useForm} from "react-hook-form";

type InputsRecover = {
    email: string;
}


const Recover: FC<Step> = ({users, setStep}) => {

    const {register, handleSubmit, formState: {errors, isSubmitSuccessful}, setError, clearErrors} = useForm<InputsRecover>()

    const stepLogin = () => {
        setStep('login')
    }

    const onSubmit: SubmitHandler<InputsRecover> = data => {
        if (!data.email.trim()) {
            setError('email', {
                type: "required",
            })
            return
        }

        const user: Users = users.filter(obj => obj.email === data.email.trim())[0]

        if (user !== undefined) {
            setStep('reset')
        } else {
            setError('email', {
                type: "custom",
                message: 'Пользователя с такой почтой не найдено'
            })
        }

    };

    const className = (filedName: keyof InputsRecover) => {
        if (errors[filedName]) {
            return 'form_input  form_input--error'
        }

        if (isSubmitSuccessful) {
            return 'form_input form_input--success'
        }

        return 'form_input'
    }

    const clearError = () => {
        clearErrors('email')
    }

    return (
        <>
            <h1 className='title title--recover'>Восстановить пароль</h1>
            <span className='description'>Инструкции по восстановлению пароля будут отправлены на вашу электронную почту.</span>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
                <label className='form_label form_label--margin'>
                    <span className='form_name'>Email:</span>
                    <input className={className("email")}
                           type="text" {...register("email", {required: true})} onChange={clearError}/>
                    {errors.email && <span className='form_error'>{errors.email.message}</span>}
                </label>
                <button className='button' type='submit'>Сбросить пароль</button>
            </form>
            <div className='action' onClick={stepLogin}>
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

export default Recover;