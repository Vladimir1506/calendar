import React, {useEffect} from 'react';
import './App.css';
import AppRouter from './components/AppRouter';
import {Layout} from 'antd';
import Navbar from './components/Navbar';
import {useActions} from './hooks/useActions';
import {IUser} from './models/IUser';

function App() {
    const {setAuth, setUser} = useActions()
    useEffect(() => {
        const userName = localStorage.getItem('userName')
        if (userName) {
            setAuth(true)
            setUser({userName} as IUser)
        }
    }, []);
    return (
        <Layout>
            <Navbar/>
            <Layout.Content>
                <AppRouter/>
            </Layout.Content>
        </Layout>
    );
}

export default App;
