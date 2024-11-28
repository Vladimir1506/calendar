import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {privateRoutes, publicRoutes, RouteNames} from '../router';
import {useSelector} from 'react-redux';
import {RootState} from '../store';

const AppRouter = () => {
    const isAuth = useSelector<RootState>(state => state.auth?.isAuth)
    const routes = isAuth ? privateRoutes : publicRoutes
    return (
        <Routes>
            {routes.map(
                route => <Route key={route.path} path={route.path}
                                Component={route.component}/>
            )}
            <Route path={RouteNames.DEFAULT}
                   element={<Navigate to={isAuth ? RouteNames.EVENT : RouteNames.LOGIN} replace/>}/>
        </Routes>
    );
};

export default AppRouter;
