import {Component, OnInit, ViewChild} from '@angular/core';
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
import {MdbModalRef, MdbModalService} from 'mdb-angular-ui-kit/modal';
import {PriorityModalComponent} from '../../priority-modal/priority-modal.component';
import {EventModalComponent} from "../../event-modal/event-modal.component";
import {ApiserviceService} from 'src/app/apiservice.service';


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
    styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {

    @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

    modalRef: MdbModalRef<PriorityModalComponent> | null = null;
    eventModalRef: MdbModalRef<EventModalComponent> | null = null;

    constructor(
        private service: SenderService,
        private modalService: MdbModalService,
        private apiService: ApiserviceService
    ) {
        this.service.event1.subscribe(value => {
            if (value == this.service.title) {
                this.add(this.service.title, this.service.priority, this.service.start, this.service.end, this.service.allDay);
            }
        })
        this.service.event2.subscribe(value => {
            if (value == "url") {
                this.uploadICS(this.service.url);
            }
        })
        this.service.Sam.subscribe(value => {
            if (value == "add") {
                this.addSam();
            } else {
                this.removeSam();
            }
        })
        this.service.Justin.subscribe(value => {
            if (value == "add") {
                this.addJustin();
            } else {
                this.removeJustin();
            }
        })
        this.service.Artem.subscribe(value => {
            if (value == "add") {
                this.addArtem();
            } else {
                this.removeArtem();
            }
        })
        this.service.Ryan.subscribe(value => {
            if (value == "add") {
                this.addRyan();
            } else {
                this.removeRyan();
            }
        })
        this.service.School.subscribe(value => {
            if (value == "add") {
                this.addSchool();
            } else {
                this.removeSchool();
            }
        })
        this.service.Work.subscribe(value => {
            if (value == "add") {
                this.addWork();
            } else {
                this.removeWork();
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
            format: 'ics',
        },
        eventTextColor: "white",
        eventBackgroundColor: "red",
        eventBorderColor: "red",
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
        console.log(priority);
    }

    handleDateClick(arg: DateClickArg) {
        const calendarApi = arg.view.calendar;
        const day = arg.dateStr;
        calendarApi.changeView("timeGridDay", day);
    }

    handleEventClick(arg: EventClickArg) {
        const calendarApi = arg.event;
        if (!calendarApi.extendedProps['priority']) {
            this.modalRef = this.modalService.open(PriorityModalComponent);
            this.modalRef.onClose.subscribe((message: number) => {
                    calendarApi.setExtendedProp("priority", message);
                    if (calendarApi.extendedProps['priority']) {
                        calendarApi.setProp("backgroundColor", "green");
                        calendarApi.setProp("borderColor", "green");
                    }
                    //Update database
                }
            )
        } else {
            if (calendarApi) {
                if (calendarApi.allDay) {
                    // @ts-ignore
                    alert(`${calendarApi.title} from ${calendarApi.start.toLocaleDateString()} to ${calendarApi.end.toLocaleDateString()} with priority ${calendarApi.extendedProps['priority']}`)
                } else {
                    // @ts-ignore
                    alert(`${calendarApi.title} from ${calendarApi.start.toLocaleDateString()} at ${calendarApi.start.toLocaleTimeString()} to ${calendarApi.end.toLocaleDateString()} at ${calendarApi.end.toLocaleTimeString()} with priority ${calendarApi.extendedProps['priority']}`)
                }
            }
        }
    }

    eventGuid = 0;

    createEventId() {
        return String(this.eventGuid++);
    }

    add(title: string, priority: number, start: Date, end: Date, allDay: boolean) {
        const calendarApi = this.calendarComponent.getApi();
        if (priority) {
            calendarApi.addEvent({
                id: this.createEventId(),
                priority: priority,
                title: title,
                start: start,
                end: end,
                allDay: allDay,
                textColor: "white",
                backgroundColor: "green",
                borderColor: "green"
            })
        } else {
            calendarApi.addEvent({
                id: this.createEventId(),
                priority: priority,
                title: title,
                start: start,
                end: end,
                allDay: allDay,
                textColor: "white",
                backgroundColor: "red",
                borderColor: "red"
            })
        }
    }

    uploadICS(ics: string) {
        const calendarApi = this.calendarComponent.getApi();
        this.calendarOptions.events = {
            url: ics,
            format: 'ics'
        }
        calendarApi.render();
        this.getICSEvents();
    }

    getICSEvents() {
        const calendarApi = this.calendarComponent.getApi();
        calendarApi.getEvents().forEach(item => {
                console.log("Title: " + item.title);
            }
        );
        console.log("passed");
    }

    SamEvents = {
        events: [
            {
                title: 'Sam1',
                start: '2022-04-22',
                end: '2022-04-24',
                id: "23",
                textColor: "white",
                backgroundColor: "blue",
                borderColor: "blue"
            },
            {
                title: 'Sam2',
                start: '2022-04-25',
                id: "24",
                textColor: "white",
                backgroundColor: "blue",
                borderColor: "blue"
            }
        ]
    }
    JustinEvents = {
        events: [
            {
                title: 'Justin1',
                start: '2022-04-20',
                id: "25",
                textColor: "white",
                backgroundColor: "purple",
                borderColor: "purple"
            },
            {
                title: 'Justin2',
                start: '2022-04-10',
                id: "26",
                textColor: "white",
                backgroundColor: "purple",
                borderColor: "purple"
            }]
    }
    RyanEvents = {
        events: [{
            title: 'Ryan1',
            start: '2022-04-01',
            end: '2022-04-04',
            id: "27",
            textColor: "black",
            backgroundColor: "orange",
            borderColor: "orange"
        },
            {
                title: 'Ryan2',
                start: '2022-04-05',
                id: "28",
                textColor: "black",
                backgroundColor: "orange",
                borderColor: "orange"
            }]
    }
    ArtemEvents = {
        events: [
            {
                title: 'Artem1',
                start: '2022-04-28',
                end: '2022-04-30',
                id: "29",
                textColor: "black",
                backgroundColor: "light-blue",
                borderColor: "light-blue"
            },
            {
                title: 'Artem2',
                start: '2022-04-25',
                id: "30",
                textColor: "black",
                backgroundColor: "light-blue",
                borderColor: "light-blue"
            }

        ]
    }
    SchoolEvents = {
        events: [
            {
                title: 'CS3141',
                start: '2022-04-20',
                end: '2022-04-21',
                id: "29",
                textColor: "black",
                backgroundColor: "yellow",
                borderColor: "yellow"
            },
            {
                title: 'CS3141',
                start: '2022-04-22',
                end: '2022-04-23',
                id: "29",
                textColor: "black",
                backgroundColor: "yellow",
                borderColor: "yellow"
            },

        ]
    }
    WorkEvents = {
        events: [
            {
                title: 'Work',
                start: '2022-04-18',
                end: '2022-04-23',
                id: "29",
                textColor: "white",
                backgroundColor: "black",
                borderColor: "black"
            },
            {
                title: 'Work',
                start: '2022-04-25',
                end: '2022-04-30',
                id: "29",
                textColor: "white",
                backgroundColor: "black",
                borderColor: "black"
            },

        ]
    }

    addSam() {
        let calendar = this.calendarComponent.getApi();
        calendar.addEventSource(this.SamEvents);
    }

    removeSam() {
        let calendar = this.calendarComponent.getApi();
        calendar.getEventById("23")?.remove();
        calendar.getEventById("24")?.remove();
    }

    addJustin() {
        let calendar = this.calendarComponent.getApi();
        calendar.addEventSource(this.JustinEvents);
    }

    removeJustin() {
        let calendar = this.calendarComponent.getApi();
        calendar.getEventById("25")?.remove();
        calendar.getEventById("26")?.remove();
    }

    addRyan() {
        let calendar = this.calendarComponent.getApi();
        calendar.addEventSource(this.RyanEvents);
    }

    removeRyan() {
        let calendar = this.calendarComponent.getApi();
        calendar.getEventById("27")?.remove();
        calendar.getEventById("28")?.remove();
    }

    addArtem() {
        let calendar = this.calendarComponent.getApi();
        calendar.addEventSource(this.ArtemEvents);
    }

    removeArtem() {
        let calendar = this.calendarComponent.getApi();
        calendar.getEventById("29")?.remove();
        calendar.getEventById("30")?.remove();
    }
    addSchool() {
        let calendar = this.calendarComponent.getApi();
        calendar.addEventSource(this.SchoolEvents);
    }

    removeSchool() {
        let calendar = this.calendarComponent.getApi();
        calendar.getEventById("31")?.remove();
        calendar.getEventById("32")?.remove();
    }
    addWork() {
        let calendar = this.calendarComponent.getApi();
        calendar.addEventSource(this.WorkEvents);
    }

    removeWork() {
        let calendar = this.calendarComponent.getApi();
        calendar.getEventById("33")?.remove();
        calendar.getEventById("34")?.remove();
    }

    ngOnInit(): void {
        this.loadAllEvents();

        this.currentEvents += this.displayAllEvents();
    }

    // ---- API Service -----------------------------------------

    // Run through all active calendars and init their events
    loadAllEvents(): void {
        const userCalData = localStorage.getItem('user_cals');
        const uID = this.apiService.getUID();
        JSON.parse(userCalData!).forEach((c: any) => {
            this.loadCalEvents(uID, c);
        });
    }

    // Take a specific calendar and load all of it's events
    loadCalEvents(uID: any, c: any): void {
        console.log(`Loading events for calendar '${c.title}'...`);
        this.apiService.getCalendarEvents(uID, c.cID).subscribe((res) => {
            console.log(res);
            sessionStorage.setItem(`cal_${c.title}_events`, JSON.stringify(res.data));
        })
    }

    // Unload all events in the cal_name_events session data and display them on the calendar
    displayAllEvents(): any {
        const userCalData = localStorage.getItem('user_cals');
        const uID = this.apiService.getUID();
        JSON.parse(userCalData!).forEach((c: any) => {
            this.displayCalEvents(uID, c);
        });
    }

    // Breaks the array of events out from the calendar data
    displayCalEvents(uID: any, c: any) {
        console.log(`Loading events for calendar '${c.title}'...`);
        this.apiService.getCalendarEvents(uID, c.cID).subscribe((res) => {
            console.log(res);
            const events = sessionStorage.getItem(`cal_${c.title}_events`);
            JSON.parse(events!).forEach((e: any) => {
                this.displayEvent(e);
            })
        })
    }

    // Adds an individual event to the calendar
    displayEvent(e: any) {
        console.log(e.title, e.priorityID, e.dateTimeStart, e.dateTimeEnd, e.isAllDay);
        this.add(e.title, e.priorityID, e.dateTimeStart, e.dateTimeEnd, e.isAllDay);
    }
}