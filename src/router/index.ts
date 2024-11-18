import {ComponentType} from 'react';
import Login from '../pages/Login';
import Event from '../pages/Event';

export interface IRoute {
    path: string
    component: ComponentType
}

export enum RouteNames {
    LOGIN = '/login',
    EVENT = '/',
    DEFAULT = '*'
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.LOGIN, component: Login},
]

export const privateRoutes: IRoute[] = [
    {path: RouteNames.EVENT, component: Event},
]
