import { Component, OnInit } from '@angular/core';
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {SenderService} from "../sender.service";

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.css']
})
export class EventModalComponent implements OnInit {

  constructor(
      private service: SenderService,
  ) { }

  getNewEvent() {
    let title = (document.getElementById("eventTitle") as HTMLInputElement).value;
    if (title) {
      let priority = (document.getElementById("priority") as HTMLInputElement).value;
      let allDay = (document.getElementById("allDay") as HTMLInputElement).checked;
      let startDate = new Date((document.getElementById("startDate") as HTMLInputElement).value);
      let endDate = new Date((document.getElementById("endDate") as HTMLInputElement).value);
      if (endDate >= startDate) {
        this.service.title = title;
        this.service.priority = parseInt(priority);
        this.service.allDay = allDay;
        this.service.start = startDate;
        this.service.end = endDate;
        (document.getElementById("eventForm") as HTMLFormElement).reset();
        this.service.addEvent(title);
      }
      else {
        alert("End is before Start");
      }
    }
  }

  show = true;

  showGuest() {
    let checkboxes = document.getElementById("checkBoxes") as HTMLDivElement;
    if (this.show) {
      checkboxes.style.display = "block";
      this.show = false;
    } else {
      checkboxes.style.display = "none";
      this.show = true;
    }
  }

  ngOnInit(): void {
  }

}
