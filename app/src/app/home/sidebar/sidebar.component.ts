import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {EventModalComponent} from "../../event-modal/event-modal.component";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {

  eventModalRef: MdbModalRef<EventModalComponent> | null = null;
  
  constructor(
      private modalService: MdbModalService
  ) { }
  
  openEvent() {
    this.eventModalRef = this.modalService.open(EventModalComponent);
  }

  ngOnInit(): void {

    $(document).ready(function () {

      $('#sidebarExpand').on('click',function () {
        $('#sidebar').toggleClass('active');
      });
      

    });
    $(document).ready(function() {
      $('input[type="checkbox"]').on('click', function() {
        let inputValue = $(this).attr("value");
        $("." + inputValue).toggle();
      });
    });

  }
  

}
