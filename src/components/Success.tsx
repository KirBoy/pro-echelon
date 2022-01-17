import React, {FC} from 'react';
import {Step} from "../types";

const Success: FC<Step> = ({users, setStep}) => {

    const step = (e: React.MouseEvent, step: string): void => {
        setStep(step)
    }

    return (
        <>
            <h1 className='title title--success'>Пароль был успешно восстановлен</h1>
            <button className='button button--margin' onClick={(e) => step(e, 'login')}>Вернуть ко входу</button>
            <div className='links'>
                <a className='link link--dot' href=''>Работа с персональными данными</a>
                <a className='link' href=''>Правила</a>
            </div>
        </>
    );
};

export default Success;