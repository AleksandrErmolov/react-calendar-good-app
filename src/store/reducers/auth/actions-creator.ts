import { AppDispatch } from '../..';
import UserService from '../../../api/UserService';
import { IUser } from './../../../models/IUsers';
import { AuthActionEnum, SetAuthAction, SetUserAction, SetIsLoadingAction, SetErrorAction } from './types';



export const AuthActionCreators = {

    setUser: (user: IUser): SetUserAction => ({ type: AuthActionEnum.SET_USER, payload: user }),
    setIsAuth: (auth: boolean): SetAuthAction => ({ type: AuthActionEnum.SET_AUTH, payload: auth }),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({ type: AuthActionEnum.SET_IS_LOADING, payload }),
    setError: (payload: string): SetErrorAction => ({ type: AuthActionEnum.SET_ERROR, payload }),
    login: (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true))
            setTimeout( async () => {
                const response = await UserService.getUsers()
                const mockUsers = response.data.find(user => user.username === username && user.password === password)
                if (mockUsers) {
                    localStorage.setItem('auth', 'true')
                    localStorage.setItem('username', mockUsers.username)
                    dispatch(AuthActionCreators.setUser(mockUsers))
                    dispatch(AuthActionCreators.setIsAuth(true))

                } else {
                    dispatch(AuthActionCreators.setError('Вы ввели не правильный логин или пароль! Пробуй!'))
                }
                dispatch(AuthActionCreators.setIsLoading(false))
            }, 2000)

        } catch (error) {
            dispatch(AuthActionCreators.setError('Произошла ошибка при логине'))
        }
        
    },
    logout: () => async(dispatch: AppDispatch) => {
            localStorage.removeItem('auth')
            localStorage.removeItem('username')
            dispatch(AuthActionCreators.setUser({} as IUser))
            dispatch(AuthActionCreators.setIsAuth(false))
    }
}