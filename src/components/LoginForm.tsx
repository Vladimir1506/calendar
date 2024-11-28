import React from 'react';
import {Button, Form, FormProps, Input} from 'antd';
import {rules} from '../utils/rules';
import {IUser} from '../models/IUser';
import {useAppSelector} from '../hooks/useAppHooks';
import {useActions} from '../hooks/useActions';

const getRules = rules.getRules
const LoginForm = () => {
    const {isLoading, error} = useAppSelector(state => state.auth)
    console.log('isLoading: ' + isLoading)
    console.log('error: ' + error)
    const {login} = useActions()
    const submit: FormProps<IUser>['onFinish'] = (values) => {
        login(values.userName, values.password)
    }
    return (
        <Form<IUser> onFinish={submit}>
            {error && <div style={{color: 'red'}}>
                {error}
            </div>}
            <Form.Item
                label="Логин"
                name="userName"
                rules={[getRules('Введите ваше имя')]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Пароль"
                name="password"
                rules={[getRules('Введите пароль')]}
            >
                <Input.Password/>
            </Form.Item>
            <Form.Item label={null}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Войти
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
