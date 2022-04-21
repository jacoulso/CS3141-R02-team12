import { Component, OnInit } from '@angular/core';
import {SenderService} from "../../sender.service";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {NewEventModalComponent} from "../new-event-modal/new-event-modal.component";

@Component({
  selector: 'app-import-modal',
  templateUrl: './import-modal.component.html',
  styleUrls: ['./import-modal.component.css']
})
export class ImportModalComponent implements OnInit {
  constructor(
      private sender: SenderService,
      public modalRef: MdbModalRef<NewEventModalComponent>
  ){
  }

  ngOnInit(): void {
  }

  getICS() {
    let ics = (document.getElementById("myfile") as HTMLInputElement).value;
    if (ics) {
      this.sender.url = ics;
      (document.getElementById("importForm") as HTMLFormElement).reset();
      this.sender.sendString("url");
    }
  }
}
