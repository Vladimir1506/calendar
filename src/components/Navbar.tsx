import React from 'react';
import {Layout, Menu} from 'antd';
import {RouteNames} from '../router';
import {useAppSelector} from '../hooks/useAppHooks';
import {useActions} from '../hooks/useActions';

const Navbar = () => {
    const {logout} = useActions()
    const {isAuth, user} = useAppSelector(state => state.auth)
    const items = (isAuth ? [{
        label: user.userName,
        path: RouteNames.LOGIN
    }, {
        label: 'Выйти',
        path: RouteNames.LOGIN,
        onClick: () => logout()
    }] : [{
        label: 'Логин',
        path: RouteNames.LOGIN
    }]).map((item, index) => <Menu.Item key={index} onClick={item.onClick}>{item.label}</Menu.Item>);
    return (
        <Layout.Header>
            <Menu theme="dark" mode="horizontal" selectable={false}
                  style={{
                      justifyContent: 'end'
                  }}>{items}</Menu>
        </Layout.Header>
    );
};

export default Navbar;
