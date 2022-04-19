import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {EventModalComponent} from "../../event-modal/event-modal.component";
import {NewEventModalComponent} from "../../modal/new-event-modal/new-event-modal.component";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})

export class SidebarComponent {
  modalRef: MdbModalRef<NewEventModalComponent> | null = null;

  eventModalRef: MdbModalRef<EventModalComponent> | null = null;
  
  constructor(
      private modalService: MdbModalService
  ) { }
  
  openEvent() {
    this.eventModalRef = this.modalService.open(EventModalComponent);
  }

  openNewEventModal() {
    this.modalRef = this.modalService.open(NewEventModalComponent)
  }
}
