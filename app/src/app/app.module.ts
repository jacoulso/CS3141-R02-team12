import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import {CalendarCommonModule, CalendarModule, CalendarMonthModule, DateAdapter} from "angular-calendar";
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";
import {SidebarComponent} from "./home/sidebar/sidebar.component";

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    SidebarComponent
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
    CalendarMonthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
