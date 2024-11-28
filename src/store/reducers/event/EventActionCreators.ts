import {IUser} from '../../../models/IUser';
import {EventActionEnum, SetEventsAction, SetGuestsAction} from './types';
import {IEvent} from '../../../models/IEvent';
import {AppDispatch} from '../../index';
import UserService from '../../../api/UserService';

const setCurrentEvents = (events: IEvent[], dispatch: AppDispatch) => {
    const userName = localStorage.getItem('userName') as string
    const currentUserEvents = events.filter(event => event.guest === userName || event.author === userName)
    dispatch(EventActionCreators.setEvents(currentUserEvents))
}
const getEvents = () => {
    const data = localStorage.getItem('events') || '[]'
    const events: IEvent[] = JSON.parse(data)
    return events
}
export const EventActionCreators = {
    setGuests: (guests: IUser[]): SetGuestsAction => ({type: EventActionEnum.SET_GUESTS, payload: guests}),
    setEvents: (events: IEvent[]): SetEventsAction => ({type: EventActionEnum.SET_EVENTS, payload: events}),
    fetchGuests: () => async (dispatch: AppDispatch) => {
        try {
            const response = await UserService.getUsers()
            const mockUsers = response.data
            if (mockUsers) {
                dispatch(EventActionCreators.setGuests(mockUsers))
            }
        } catch (e) {
        }
    },
    createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
        try {
            const events = getEvents()
            events.push(event)
            localStorage.setItem('events', JSON.stringify(events))
            setCurrentEvents(events, dispatch)
        } catch (e) {
            console.log(e)
        }
    },
    fetchEvents: () => async (dispatch: AppDispatch) => {
        try {
            setCurrentEvents(getEvents(), dispatch)
        } catch (e) {
            console.log(e)
        }
    }
}
