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
      let startDate = new Date((document.getElementById("start") as HTMLInputElement).value);
      let endDate = new Date((document.getElementById("end") as HTMLInputElement).value);
      this.service.title = title;
      this.service.start = startDate;
      this.service.end = endDate;
      (document.getElementById("form") as HTMLFormElement).reset();
      this.service.addEvent(title);
    }
  }
}
