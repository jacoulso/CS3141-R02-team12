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
import { ApiserviceService } from './apiservice.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MdbModalModule, MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {MdbFormsModule} from "mdb-angular-ui-kit/forms";
import {MdbValidationModule} from "mdb-angular-ui-kit/validation";
import {OverlayModule} from "@angular/cdk/overlay";
import { NewEventModalComponent } from './modal/new-event-modal/new-event-modal.component';
import {MdbCheckboxModule} from "mdb-angular-ui-kit/checkbox";
import {MdbDropdownModule} from "mdb-angular-ui-kit/dropdown";
import {MdbRadioModule} from "mdb-angular-ui-kit/radio";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { SocialModalComponent } from './modal/social-modal/social-modal.component';
import { ImportModalComponent } from './modal/import-modal/import-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    SidebarComponent,
    HeaderComponent,
    CalendarComponent,
    SignUpComponent,
    NewEventModalComponent,
    SocialModalComponent,
    ImportModalComponent,
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        CalendarModule,
        AppRoutingModule,
        ReactiveFormsModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
        CalendarCommonModule,
        CalendarMonthModule,
        FullCalendarModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MdbFormsModule,
        MdbValidationModule,
        OverlayModule,
        MdbModalModule,
        MdbCheckboxModule,
        MdbDropdownModule,
        MdbRadioModule,
        BrowserAnimationsModule
    ],
  providers: [
      ApiserviceService,
  ],
    bootstrap: [
        AppComponent,
    ]
})
export class AppModule { }
