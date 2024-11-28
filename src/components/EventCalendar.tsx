import React from 'react';
import {Badge, Calendar} from 'antd';
import {IEvent} from '../models/IEvent';
import type {Dayjs} from 'dayjs';

interface EventCalendarProps {
    events: IEvent[]
}

const EventCalendar = ({events}: EventCalendarProps) => {
    const dateCellRender = (value: Dayjs) => {
        let evs = events.filter(e => value.format('YYYY-MM-DD') === e.date)
        return <ul>
            {evs.map((item, index) => (
                <li key={index}>
                    <Badge status={'success'} text={item.description}/>
                </li>
            ))}
        </ul>
    }
    return (
        <Calendar cellRender={dateCellRender}/>
    );
};

export default EventCalendar;
