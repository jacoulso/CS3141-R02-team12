import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-priority-modal',
  templateUrl: './priority-modal.component.html',
  styleUrls: ['./priority-modal.component.css']
})
export class PriorityModalComponent implements OnInit {

  constructor(public modalRef: MdbModalRef<PriorityModalComponent>) { }

  close(): void {
    let priority = (document.getElementById("oldpriority") as HTMLInputElement).value;
    console.log(priority);
    this.modalRef.close(parseInt(priority));
  }
  
  ngOnInit(): void {
  }

}
