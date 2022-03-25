import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import {CalendarCommonModule, CalendarModule, CalendarMonthModule, DateAdapter} from "angular-calendar";
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";
import {SidebarComponent} from "./home/sidebar/sidebar.component";
import { HeaderComponent } from './home/header/header.component';
//import { ModalComponent } from './modal/modal.component';
import { CalendarComponent } from './home/calendar/calendar.component';

import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins



@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    SidebarComponent,
    HeaderComponent,
    //ModalComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    CalendarModule,
    AppRoutingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    CalendarCommonModule,
    CalendarMonthModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
