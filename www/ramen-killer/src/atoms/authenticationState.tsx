import { recoilPersist } from 'recoil-persist'
import { atom } from 'recoil'
const { persistAtom } = recoilPersist()

export const authenticationState = atom({
    key: 'authentication' ,
    default: {
        uid:'',
        name:'',
        email:'',
        token:''
    },
    effects_UNSTABLE: [persistAtom]
});