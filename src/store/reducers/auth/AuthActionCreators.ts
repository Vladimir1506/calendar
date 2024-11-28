import {IUser} from '../../../models/IUser';
import {AuthActionEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction} from './types';
import {AppDispatch} from '../../index';
import UserService from '../../../api/UserService';

export const AuthActionCreators = {
    setUser: (user: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
    setAuth: (auth: boolean): SetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload: auth}),
    setError: (error: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload: error}),
    setIsLoading: (loading: boolean): SetIsLoadingAction => ({type: AuthActionEnum.SET_IS_LOADING, payload: loading}),
    login: (userName: string, password: string) => async (dispatch: AppDispatch) => {
        dispatch(AuthActionCreators.setError(''))
        try {
            dispatch(AuthActionCreators.setIsLoading(true))
            setTimeout(async () => {
                const response = await UserService.getUsers()
                const mockUser = response.data.find(user => user.userName === userName && user.password === password)
                if (mockUser) {
                    localStorage.setItem('auth', 'true')
                    localStorage.setItem('userName', mockUser.userName)
                    dispatch(AuthActionCreators.setAuth(true))
                    dispatch(AuthActionCreators.setUser(mockUser))
                } else {
                    dispatch(AuthActionCreators.setError('Пользователь не найден'))
                }
                dispatch(AuthActionCreators.setIsLoading(false))
            }, 3000)
        } catch (e) {
            dispatch(AuthActionCreators.setError('Произошла ошибка при логировании'))
            dispatch(AuthActionCreators.setIsLoading(false))
        }
    },
    logout: () => (dispatch: AppDispatch) => {
        dispatch(AuthActionCreators.setAuth(false))
        dispatch(AuthActionCreators.setUser({} as IUser))
        localStorage.removeItem('auth')
        localStorage.removeItem('userName')
    },
}
