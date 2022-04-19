import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {NewEventModalComponent} from "../../modal/new-event-modal/new-event-modal.component";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})

export class SidebarComponent {
  modalRef: MdbModalRef<NewEventModalComponent> | null = null;

  constructor(private modalService: MdbModalService) {}

  openNewEventModal() {
    this.modalRef = this.modalService.open(NewEventModalComponent)
  }
}
