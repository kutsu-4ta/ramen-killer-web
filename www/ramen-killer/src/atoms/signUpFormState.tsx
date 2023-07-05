import { atom } from 'recoil'

export const signUpFormUserIdState = atom({
    key: 'signUpFormUserId' ,
    default: ''
});
export const signUpFormUserIdErrorState = atom({
    key: 'signUpFormUserIdError' ,
    default: ''
});

export const signUpFormEmailState = atom({
    key: 'signUpFormEmail' ,
    default: ''
});
export const signUpFormEmailErrorState = atom({
    key: 'signUpFormEmailError' ,
    default: ''
});

export const signUpFormPassWordState = atom({
    key: 'signUpFormPassWord' ,
    default: ''
});
export const signUpFormPassWordErrorState = atom({
    key: 'signUpFormPassWordError' ,
    default: ''
});

export const signUpFormReInputPassWordState = atom({
    key: 'signUpFormReInputPassWord' ,
    default: ''
});
export const signUpFormReInputPassWordErrorState = atom({
    key: 'signUpFormReInputPassWordError' ,
    default: ''
});