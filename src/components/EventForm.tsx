import React, {useState} from 'react';
import {Button, DatePicker, Form, Input, Row, Select} from 'antd';
import {rules} from '../utils/rules';
import {IUser} from '../models/IUser';
import {IEvent} from '../models/IEvent';
import {useAppSelector} from '../hooks/useAppHooks';

const {getRules, isDateAfter} = rules
const EventForm = ({guests, submit}: { guests: IUser[], submit: (event: IEvent) => void }) => {
    const [event, setEvent] = useState<IEvent>({
        author: '',
        date: '',
        description: '',
        guest: '',
    })
    const userName = useAppSelector(state => state.auth?.user.userName)
    return <Form onFinish={() => submit({...event, author: userName})}>
        <Form.Item
            label="Описание события"
            name="description"
            rules={[getRules()]}>
            <Input onChange={(e) => setEvent({...event, description: e.target.value})}/>
        </Form.Item>
        <Form.Item
            label="Дата события"
            name="date"
            rules={[getRules(), isDateAfter('Нельзя создать событие в прошлом')]}>
            <DatePicker onChange={(date, dateString) => setEvent({...event, date: dateString as string})}/>
        </Form.Item>
        <Form.Item
            label="Пользователи"
            name="users"
            rules={[getRules()]}>
            <Select onChange={(guest: string) => {
                setEvent({...event, guest})
            }}>
                {guests.map((guest, index) => <Select.Option key={index}
                                                             value={guest.userName}>{guest.userName}</Select.Option>)}
            </Select>
        </Form.Item>
        <Form.Item>
            <Row justify={'end'}>
                <Button type="primary" htmlType="submit">
                    Создать
                </Button>
            </Row>
        </Form.Item>
    </Form>
}

export default EventForm;
