import { Component, OnInit } from '@angular/core';
import { ModalComponent } from "../modal.component";
import { MdbModalRef } from "mdb-angular-ui-kit/modal";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-newcal-modal',
  templateUrl: './newcal-modal.component.html',
  styleUrls: ['./newcal-modal.component.scss']
})
export class NewcalModalComponent implements OnInit {
  newcalForm!: FormGroup;
  errors: any = [];
  notify!: string;

  constructor(
    public modalRef: MdbModalRef<ModalComponent>,
    private formBuilder: FormBuilder,
    private service: ApiserviceService,
  ) { }

  ngOnInit(): void {
    this.newcalForm = this.formBuilder.group({
        uID: this.service.getUID(), 
        title: ['', Validators.required]
      },
    );
  }

  addNewCal() {
    console.log(`Creating calendar...`);
    this.errors = []; // reset justin case
    this.service.createCalendarForUser(this.newcalForm.value).subscribe((res) => {
      // Code for successful calendar add goes here...
      if (res.successCode) { window.location.reload(); } // Cheat code to close the modal and reload all the calendars and events...
    },
      (errorResponse) => {
        this.errors.push(errorResponse.error.error);
      });
  }
}
