import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SenderService} from "../../sender.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {MdbDropdownDirective} from "mdb-angular-ui-kit/dropdown";
import {ApiserviceService} from "../../apiservice.service";

@Component({
  selector: 'app-new-event-modal',
  templateUrl: './new-event-modal.component.html',
  styleUrls: ['./new-event-modal.component.scss']
})
export class NewEventModalComponent implements OnInit {
  @ViewChild('dropdown') dropdown!:MdbDropdownDirective
  newEventForm!: FormGroup;
  errors: any = [];
  notify!: string;

  constructor(
      private router: Router,
      private sender: SenderService,
      private formBuilder: FormBuilder,
      private service: ApiserviceService,
      public modalRef: MdbModalRef<NewEventModalComponent>,
      ) {
  }

  ngOnInit(): void {
    this.newEventForm = this.formBuilder.group({
          // eID is handled internally
          creatorID: this.service.getUID(),
          // calendarID: this.getActiveCalendar(), // these are out of control of the user, so no validation needed
          colorID: ['', Validators.required],  // #### UNUSED IN FORM ####
          title: ['', Validators.required],
          isAllDay: ['', Validators.required],
          dateTimeStart: ['', Validators.required],
          dateTimeEnd: ['', Validators.required],
          duration: ['', Validators.required],
          location: ['', Validators.required],
          eventTypeID: ['', Validators.required],  // #### UNUSED IN FORM ####
          priorityID: ['', Validators.required],
          description: ['', Validators.required],
          recurrence: ['', Validators.required],  // #### UNUSED IN FORM ####
          recurrenceEndDate: ['', Validators.required],  // #### UNUSED IN FORM ####
        },
    );
  }
  addEvent() {
    console.log(`Saving event...`);
    this.errors = []; // reset justin case
    this.service.addEvent(this.newEventForm.value).subscribe((res) => {
          // Code for successful event add goes here...
          console.log(res);
        },
        (errorResponse) => {
          this.errors.push(errorResponse.error.error);
        });
  }

  getNewEvent() {
    let title = (document.getElementById("title") as HTMLInputElement).value;
    if (title) {
      let priority = (document.getElementById("priority") as HTMLInputElement).value;
      let allDay = (document.getElementById("allDay") as HTMLInputElement).checked;
      let startDate = new Date((document.getElementById("start") as HTMLInputElement).value);
      let endDate = new Date((document.getElementById("end") as HTMLInputElement).value);
      if (endDate >= startDate) {
        this.sender.title = title;
        this.sender.priority = parseInt(priority);
        this.sender.allDay = allDay;
        this.sender.start = startDate;
        this.sender.end = endDate;
        (document.getElementById("form") as HTMLFormElement).reset();
        this.sender.addEvent(title);
      }
      else {
        alert("End is before Start");
      }

    }
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
