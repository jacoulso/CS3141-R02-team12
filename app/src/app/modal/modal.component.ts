import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {SenderService} from "../sender.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  constructor(
      private router: Router,
      private service: SenderService,
  ) {
  }

  ngOnInit(): void {
  }

  getNewEvent() {
    let title = (document.getElementById("title") as HTMLInputElement).value;
    if (title) {
      let priority = (document.getElementById("priority") as HTMLInputElement).value;
      let allDay = (document.getElementById("allDay") as HTMLInputElement).checked;
      let startDate = new Date((document.getElementById("start") as HTMLInputElement).value);
      let endDate = new Date((document.getElementById("end") as HTMLInputElement).value);
      if (endDate >= startDate) {
        this.service.title = title;
        this.service.priority = parseInt(priority);
        this.service.allDay = allDay;
        this.service.start = startDate;
        this.service.end = endDate;
        (document.getElementById("form") as HTMLFormElement).reset();
        this.service.addEvent(title);
      }
      else {
        alert("End is before Start");
      }

    }
  }

  getICS() {
    let ics = (document.getElementById("myfile") as HTMLInputElement).value;
    if (ics) {
      this.service.url = ics;
      (document.getElementById("importForm") as HTMLFormElement).reset();
      this.service.sendString("url");
    }
  }

  
  // ---- Service - Events ------------------------------------

  addEvent(): void {

  }

  updateEvent(): void {

  }

  deleteEvent(): void {

  }
}