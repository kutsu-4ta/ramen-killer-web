import { atom } from 'recoil'

export const loginFormUidOrEmailState = atom({
    key: 'loginFormUserId' ,
    default: ''
});
export const loginFormUidOrEmailErrorState = atom({
    key: 'loginFormUserIdError' ,
    default: ''
});

export const loginFormPasswordState = atom({
    key: 'loginFormPassword' ,
    default: ''
});
export const loginFormPasswordErrorState = atom({
    key: 'loginFormPasswordError' ,
    default: ''
});