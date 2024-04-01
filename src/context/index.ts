import {createContext} from 'react';

interface AuthType {
    isAuth: boolean,
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>> | null,
    isLoading: boolean,
}
export const AuthContext = createContext<AuthType>({isAuth: false, setIsAuth: null, isLoading: true});