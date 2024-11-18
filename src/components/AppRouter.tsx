import React from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import {privateRoutes, publicRoutes, RouteNames} from '../router';

const AppRouter = () => {
    const auth = true
    const routes = auth ? privateRoutes : publicRoutes
    return (
        <Routes>
            {routes.map(
                route => <Route key={route.path} path={route.path}
                                Component={route.component}/>
            )}
            <Route path={RouteNames.DEFAULT}
                   element={<Navigate to={auth ? RouteNames.EVENT : RouteNames.LOGIN} replace />}/>
        </Routes>
    );
};

export default AppRouter;
