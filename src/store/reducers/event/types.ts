import { IEvent } from './../../../models/IEvents';
import { IUser } from './../../../models/IUsers';


export interface EventState {
    guests: IUser[];
    events: IEvent[];
}

export enum EventActionEnum {
    SET_GUESTS = 'SET_GUESTS',
    SET_EVENTS = 'SET_EVENTS'
}

export interface SetGuestsAction {
    type: EventActionEnum.SET_GUESTS
    payload: IUser[]
}

export interface SetEventsAction {
    type: EventActionEnum.SET_EVENTS
    payload: IEvent[]
}

export type EventAction =
    SetEventsAction |
    SetGuestsAction