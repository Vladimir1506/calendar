import {combineReducers} from 'redux';
import reducers from './reducers/index';
import {configureStore} from '@reduxjs/toolkit';

const rootReducer = combineReducers(reducers)
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: true, // Убедитесь, что `redux-thunk` включён
            serializableCheck: false, // Отключение проверки сериализации, если нужно
        }).concat(/* ваши middleware */),
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
