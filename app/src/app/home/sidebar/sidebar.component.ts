import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {EventModalComponent} from "../../event-modal/event-modal.component";
import {NewEventModalComponent} from "../../modal/new-event-modal/new-event-modal.component";
import {ImportModalComponent} from "../../modal/import-modal/import-modal.component";
import {SocialModalComponent} from "../../modal/social-modal/social-modal.component";
import {NewcalModalComponent} from "../../modal/newcal-modal/newcal-modal.component";
import { ApiserviceService } from 'src/app/apiservice.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})

export class SidebarComponent implements OnInit {
  modalRef: MdbModalRef<NewEventModalComponent> | null = null;

  eventModalRef: MdbModalRef<EventModalComponent> | null = null;

  calendars = []; // for keeping our json calendar data, TODO: this should be an array, but we're not there yet lol...
  
  constructor(
      private modalService: MdbModalService,
      private service:ApiserviceService
  ) { }
  
  // Modal controls
  openEvent() {
    this.eventModalRef = this.modalService.open(EventModalComponent);
  }
  openNewEventModal() {
    this.modalRef = this.modalService.open(NewEventModalComponent)
  }
  openNewCalModal() {
    this.modalRef = this.modalService.open(NewcalModalComponent)
  }
  openImportModal() {
    this.modalRef = this.modalService.open(ImportModalComponent)
  }
  openSocialsModal() {
    this.modalRef = this.modalService.open(SocialModalComponent)
  }

  // Calendar loading 
  ngOnInit(): void {
    this.loadAllCalendars();
  }

  loadAllCalendars(): void {
    const ud = this.service.getUID();
    this.service.getAllCalendars(ud).subscribe( (res) => {
      localStorage.setItem('user_cals', JSON.stringify(res.data));;
    })
    this.loadCalendarTitles(); // this has to wait on the load calendar promise...
  }

  loadCalendarTitles() {
    this.calendars = this.getActiveCalendar();
  }

  getActiveCalendar(): any {
    return JSON.parse(localStorage.getItem("user_cals")!)[0].title; // definite(ly) json data.. compiler gets mad if we don't tell it otherwise
  }

}
