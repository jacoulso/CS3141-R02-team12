import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CalendarCommonModule } from 'angular-calendar';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    CalendarCommonModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
