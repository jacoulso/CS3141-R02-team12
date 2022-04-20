import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SenderService} from "../../sender.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {MdbDropdownDirective} from "mdb-angular-ui-kit/dropdown";

@Component({
  selector: 'app-new-event-modal',
  templateUrl: './new-event-modal.component.html',
  styleUrls: ['./new-event-modal.component.scss']
})
export class NewEventModalComponent implements OnInit {
  @ViewChild('dropdown') dropdown!:MdbDropdownDirective
  newEventForm!: FormGroup;

  constructor(
      private router: Router,
      private service: SenderService,
      private formBuilder: FormBuilder,
      public modalRef: MdbModalRef<NewEventModalComponent>,
      ) {
  }

  ngOnInit(): void {
    this.newEventForm = this.formBuilder.group({
      title: ['', Validators.required],
      priority: ['', [Validators.required]],
      start: ['', [Validators.required,]],
      end: [''],
    },
    );
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



}
