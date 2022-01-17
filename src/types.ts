import {Dispatch, SetStateAction} from "react";

export type Users = {
    userId: number;
    fullName: string;
    password: string;
    email: string;
}


export type Step = {
    users: Users[]
    setStep: Dispatch<SetStateAction<string>>;
}