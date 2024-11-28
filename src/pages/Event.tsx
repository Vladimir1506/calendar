import React, {FC, useEffect, useState} from 'react';
import EventCalendar from '../components/EventCalendar';
import {Button, Layout, Modal, Row} from 'antd';
import EventForm from '../components/EventForm';
import {useActions} from '../hooks/useActions';
import {useAppSelector} from '../hooks/useAppHooks';
import {IEvent} from '../models/IEvent';

const Event: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const {fetchGuests, createEvent, fetchEvents} = useActions()
    const {guests, events} = useAppSelector(state => state.event)

    useEffect(() => {
        fetchGuests()
        fetchEvents()
    }, []);
    const addEvent = (event: IEvent) => {
        createEvent(event)
        setIsModalOpen(false)
    }


    return (
        <Layout>
            <EventCalendar events={events}/>
            <Row justify={'center'}>
                <Button onClick={() => setIsModalOpen(true)}>Добавить событие</Button>
            </Row>
            <Modal
                title={'Добавить событие'}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <EventForm guests={guests} submit={addEvent}/>
            </Modal>
        </Layout>
    );
};

export default Event;
