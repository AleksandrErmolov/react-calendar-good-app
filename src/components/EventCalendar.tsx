import React, { FC } from 'react'
import { IEvent } from '../models/IEvents'
import { Calendar } from 'antd';
import {Moment} from "moment";
import {formatDate} from "../utils/date";


interface EventCalendarProps {
  events: IEvent[];
}

export const EventCalendar:FC<EventCalendarProps> = (props) => {

    function dateCellRender(value:Moment) {
        const formatedDate = formatDate(value.toDate())
        const currentDayEvents = props.events.filter(ev => ev.date === formatedDate)
        return (
         <div>
             {currentDayEvents.map((ev, index) =>
             <div key={index}>{ev.description}</div>
             )}
         </div>
        );
    }

  return (
    <div>
      <Calendar dateCellRender={dateCellRender}/>
    </div>
  )
}
