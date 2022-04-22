import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import { MdbModalRef, MdbModalService } from "mdb-angular-ui-kit/modal";
import { EventModalComponent } from "../../event-modal/event-modal.component";
import { NewEventModalComponent } from "../../modal/new-event-modal/new-event-modal.component";
import { ImportModalComponent } from "../../modal/import-modal/import-modal.component";
import { SocialModalComponent } from "../../modal/social-modal/social-modal.component";
import { NewcalModalComponent } from "../../modal/newcal-modal/newcal-modal.component";
import { ApiserviceService } from 'src/app/apiservice.service';
import {ManageFriendsModalComponent} from "../../modal/manage-friends-modal/manage-friends-modal.component";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})

export class SidebarComponent implements OnInit {
  modalRef: MdbModalRef<NewEventModalComponent> | null = null;

  eventModalRef: MdbModalRef<EventModalComponent> | null = null;

  /*
    The compiler has severe issues with null types. See https://www.typescriptlang.org/docs/handbook/basic-types.html#never
    for more information on that. Essentially, it sees that the array is empty and the html *ngFor throws a fit saying that the data 
    doesn't exist despite the fact that we promise to load data upon the component initialization. Work around: give it 
    data that just gets overwritten immeditaley...
  */
  public calendars = [{title: 'MakeCompilerHappy'}]; 

  constructor(
    private modalService: MdbModalService,
    private service: ApiserviceService
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
  openManageFriendsModal() {
    this.modalRef = this.modalService.open(ManageFriendsModalComponent)
  }
  // Calendar loading 
  ngOnInit(): void {
    this.loadAllCalendars();
  }

  // Function to be called whenever you need to reload the list of calendars on the sidebar
  loadAllCalendars(): void {
    const ud = this.service.getUID();
    this.service.getAllCalendars(ud).subscribe((res) => {
      localStorage.setItem('user_cals', JSON.stringify(res.data[0])); // we dont need to store anything other than the calendar data
    })
    this.calendars = this.getActiveCalendars(); // this has to wait on the load calendar promise...
  }

  // Parse all local calendars and return an array of titles
  getActiveCalendars(): any {
    return JSON.parse(localStorage.getItem("user_cals")!).map( (c: any) => {
      return {
        title: c.title 
      }
    }); 
  }

}
