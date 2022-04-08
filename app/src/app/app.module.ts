import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import {CalendarCommonModule, CalendarModule, CalendarMonthModule, DateAdapter} from "angular-calendar";
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";
import {SidebarComponent} from "./home/sidebar/sidebar.component";
import { HeaderComponent } from './home/header/header.component';
import { CalendarComponent } from './home/calendar/calendar.component';
import { HttpClientModule } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ModalComponent } from './modal/modal.component'; // must go before plugins
import { ApiserviceService } from './apiservice.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    SidebarComponent,
    HeaderComponent,
    CalendarComponent,
    ModalComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CalendarModule,
    AppRoutingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    CalendarCommonModule,
    CalendarMonthModule,
    FullCalendarModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [ApiserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
