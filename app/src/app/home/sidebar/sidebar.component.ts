import { Component, OnInit } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    $(document).ready(function () {

      $('#sidebar').hover(function () {
        $('#sidebar').toggleClass('active');
      });

    });
    
  }

}
