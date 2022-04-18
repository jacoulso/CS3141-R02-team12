import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FullCalendarModule,
  FullCalendarComponent,
  CalendarOptions,
  DateSelectArg,
  EventApi,
  EventAddArg, EventClickArg
} from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import iCalendarPlugin from "@fullcalendar/icalendar";
import interactionPlugin, {DateClickArg} from "@fullcalendar/interaction";
import {SenderService} from "../../sender.service";


FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  iCalendarPlugin,
  interactionPlugin
])

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {

  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  constructor(
      private service: SenderService
  ) {
    this.service.event1.subscribe( value => {
      if (value == this.service.title) {
        this.add(this.service.title, this.service.priority, this.service.start, this.service.end, this.service.allDay);
      }
    })
    this.service.event2.subscribe(value => {
      if (value == "url") {
        this.uploadICS(this.service.url);
      }
    })
  }

  public ics = '';

  Events: any[] = [];
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin,
      timeGridPlugin,
      listPlugin,
      iCalendarPlugin,
      interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    events: {
      url: this.ics,
      format: 'ics'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    nextDayThreshold: "00:00:00",
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    eventsSet: this.handleEvents.bind(this),
    dateClick: this.handleDateClick.bind(this),
    eventAdd: this.handleAdd.bind(this),
    eventClick: this.handleEventClick.bind(this)
  };
  currentEvents: EventApi[] = [];

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  handleAdd(arg: EventAddArg) {
    let title = arg.event.title;
    let priority = arg.event.extendedProps['priority'];
    let start = arg.event.start;

    let end = arg.event.end;
    let allDay = arg.event.allDay;
    console.log(`Title: ${title}`);
    console.log(`Priority: ${priority}`);
    console.log(`AllDay: ${allDay}`);
    // @ts-ignore
    console.log(`Start: ${1 + start?.getUTCMonth()}-${start?.getUTCDate()}-${start?.getUTCFullYear()} at ${start?.getUTCHours()}:${start?.getUTCMinutes()}`);
    // @ts-ignore
    console.log(`End: ${1 + end?.getUTCMonth()}-${end?.getUTCDate()}-${end?.getUTCFullYear()} at ${end?.getUTCHours()}:${end?.getUTCMinutes()}`);
    //This is where we add to database I think
  }

  handleDateClick(arg: DateClickArg) {
    const calendarApi = arg.view.calendar;
    const day = arg.dateStr;
    calendarApi.changeView("timeGridDay", day);
  }

  handleEventClick(arg: EventClickArg) {
    const calendarApi = arg.event;

    if (calendarApi) {
      if (calendarApi.allDay) {
        // @ts-ignore
        alert(`${calendarApi.title} from ${calendarApi.start.toLocaleDateString()} to ${calendarApi.end.toLocaleDateString()}`)
      }
      else {
        // @ts-ignore
        alert(`${calendarApi.title} from ${calendarApi.start.toLocaleDateString()} at ${calendarApi.start.toLocaleTimeString()} to ${calendarApi.end.toLocaleDateString()} at ${calendarApi.end.toLocaleTimeString()}`)
      }
    }
  }

  eventGuid = 0;
  createEventId() {
    return String(this.eventGuid++);
  }

  add(title:string, priority:number, start:Date, end:Date, allDay:boolean) {
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.addEvent({
      id: this.createEventId(),
      priority: priority,
      title: title,
      start: start,
      end: end,
      allDay: allDay,
    })
  }

  uploadICS(ics: string) {
    const calendarApi = this.calendarComponent.getApi();
    this.calendarOptions.events = {
      url: ics,
      format: 'ics'
    }
    calendarApi.render();
  }

  ngOnInit(): void {
  }

  // ---- API Service -----------------------------------------

  // Run through all active calendars and init their events
  loadAllEvents(): void {

  }

  // Take a specific calendar and load all of it's events
  loadCalEvents(): void {

  }

}