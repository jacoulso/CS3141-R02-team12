import { Component, OnInit } from '@angular/core';
import {ModalComponent} from "../modal.component";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";

@Component({
  selector: 'app-social-modal',
  templateUrl: './social-modal.component.html',
  styleUrls: ['./social-modal.component.css']
})
export class SocialModalComponent implements OnInit {

  constructor(public modalRef: MdbModalRef<ModalComponent>) { }

  ngOnInit(): void {
  }

}
