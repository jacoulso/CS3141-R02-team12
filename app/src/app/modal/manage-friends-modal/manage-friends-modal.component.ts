import { Component, OnInit } from '@angular/core';
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {ModalComponent} from "../modal.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiserviceService} from "../../apiservice.service";

@Component({
  selector: 'app-manage-friends-modal',
  templateUrl: './manage-friends-modal.component.html',
  styleUrls: ['./manage-friends-modal.component.css']
})
export class ManageFriendsModalComponent implements OnInit {

    public friends = [{username: 'Jlmillim'},{username:'Sruss'},{username:'Asharkot'}, {username:'Rccole'}];
    manageFriendsForm!: FormGroup;
    errors: any = [];

  constructor(
      public modalRef: MdbModalRef<ModalComponent>,
      private formBuilder: FormBuilder,
      private service: ApiserviceService) { }

  ngOnInit(): void {
    this.manageFriendsForm = this.formBuilder.group({
          uID: this.service.getUID(),
          friendToAdd: ['',],
          friendToRemove: ['',]
        },
    );
  }

  addFriend() {
    console.log(`Gaining a Friend :) ...`);
    this.errors = []; // reset justin case
    this.service.addFriend(this.manageFriendsForm.value().friendToAdd).subscribe((res) => {
          // Code for successful calendar add goes here...
          if (res.successCode) { window.location.reload(); } // Cheat code to close the modal and reload all the calendars and events...
        },
        (errorResponse) => {
          this.errors.push(errorResponse.error.error);
        });
  }
  removeFriend() {
    console.log(`Removing Friend :( ...`);
    this.errors = []; // reset justin case
    this.service.removeFriend(this.manageFriendsForm.value().friendToRemove).subscribe((res) => {
          // Code for successful calendar add goes here...
          if (res.successCode) { window.location.reload(); } // Cheat code to close the modal and reload all the calendars and events...
        },
        (errorResponse) => {
          this.errors.push(errorResponse.error.error);
        });
  }
  getFriends(): any{
      return JSON.parse(localStorage.getItem("user_friends")!).map( (f: any) => {
          return {
              username: f.username
          }
      });
  }
}
